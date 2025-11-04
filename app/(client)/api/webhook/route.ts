// ✅ الاستيراد في أعلى الملف فقط
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// ✅ دالة POST لمعالجة Webhook من Stripe
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "No Signature found for stripe" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ err: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in Sanity:", error);
      return NextResponse.json(
        { error: `Error creating order: ${error}` },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// ✅ دالة إنشاء الطلب في Sanity وتحديث المخزون
async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const { id, amount_total, currency, payment_intent } = session;
  // تعريف نوع مخصص لبيانات الميتا التي تتوقعها
  type SessionMetadata = {
    orderNumber?: string;
    customerName?: string;
    customerEmail?: string;
    clerkUserId?: string;
    address?: string;
  };

  const metadata = session.metadata as SessionMetadata;
  const { orderNumber, customerName, customerEmail, clerkUserId, address } =
    metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  const sanityProduct = [];
  const stockUpdates = [];

  for (const item of lineItemsWithProduct.data) {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item.quantity || 0;

    if (!productId) continue;

    sanityProduct.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });

    stockUpdates.push({ productId, quantity });
  }

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    customerName,
    email: customerEmail,
    clerkUserId,
    address: address ? JSON.parse(address) : {},
    totalPrice: amount_total,
    currency,
    stripeCustomerId: session.customer || "", // fallback لو فاضي
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: payment_intent,
    products: sanityProduct,
    amountDiscount: 0, // ممكن تحسبه لاحقًا من metadata أو الخصومات
    orderDate: new Date().toISOString(),
    status: "paid",
    invoice: {
      id: invoice?.id || "",
      number: invoice?.number || "",
      hosted_invoice_url: invoice?.hosted_invoice_url || "",
    },
  });
  for (const { productId, quantity } of stockUpdates) {
    await backendClient.patch(productId).dec({ stock: quantity }).commit();
  }

  return order;
}
