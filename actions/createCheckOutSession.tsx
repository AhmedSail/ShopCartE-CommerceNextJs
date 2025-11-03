"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItem {
  product: CartItem["product"];
  quantity: number;
}

const createCheckoutSession = async (
  items: GroupedCartItem[],
  metadata: Metadata
) => {
  try {
    // البحث عن العميل أو إنشاؤه
    const existingCustomers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customer =
      existingCustomers.data.length > 0
        ? existingCustomers.data[0]
        : await stripe.customers.create({
            email: metadata.customerEmail,
            name: metadata.customerName,
          });

    // تجهيز line_items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description || "",
            metadata: { id: item.product._id },
            images:
              item.product.images?.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      }));

    // إنشاء جلسة الدفع
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId || "",
        address: JSON.stringify(metadata.address),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: { enabled: true },
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL}/cart`,
    });

    return session.url;
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error);
    throw new Error("فشل إنشاء جلسة الدفع");
  }
};

export default createCheckoutSession;
