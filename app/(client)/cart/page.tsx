"use client";
import createCheckoutSession from "@/actions/createCheckOutSession";
import createCheckOutSession, {
  Metadata,
} from "@/actions/createCheckOutSession";
import AddToCartBtn from "@/components/AddToCartButton";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/priceFormatter";
import PriceView from "@/components/PriceView";
import { Title } from "@/components/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbRubberStamp } from "react-icons/tb";
import Swal from "sweetalert2";

export default function Cart() {
  const {
    items,
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    getGroupedItem,
  } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const handleReset = () => {
    Swal.fire({
      title: "Are you sure reset cart?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Reseted!",
          text: "Your cart has been reseted.",
          icon: "success",
        });
        resetCart();
      }
    });
  };

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"]|order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckout = async () => {
    setLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };

      const checkoutUrl = await createCheckoutSession(
        getGroupedItem(),
        metadata
      );
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <div className="bg-gray-50 ">
      {isSignedIn ? (
        <Container className="mt-20 pb-5 px-4">
          {items.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 pt-5">
                <ShoppingBag className="text-darkcolor" />
                <Title className="text-darkcolor text-2xl">Shopping Cart</Title>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 mt-10">
                {/* 🛒 قسم المنتجات */}
                <div className="md:col-span-2 rounded-lg">
                  <div className="bg-white border px-4 md:px-10 py-5">
                    {items?.map(({ product }) => {
                      const itemCount = getItemCount(product._id);
                      return (
                        <div key={product?._id} className="my-2 border p-4">
                          {product?.images && (
                            <div className="flex flex-col md:flex-row gap-3">
                              <Link href={`/product/${product?.slug?.current}`}>
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="Product Image"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-full md:w-40 h-32 md:h-44 p-2 object-cover border"
                                />
                              </Link>
                              <div className="flex flex-col justify-between flex-1">
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                >
                                  <div>
                                    <h1 className="text-lg font-bold">
                                      {product?.name}
                                    </h1>
                                    <h2 className="text-sm text-gray-600">
                                      <PriceView
                                        price={product?.price}
                                        discount={product?.discount}
                                      />
                                    </h2>
                                    <div className="text-sm mt-1">
                                      <span className="text-gray-600 font-bold">
                                        Varient:{" "}
                                      </span>
                                      <span className="font-bold">
                                        {product?.variant}
                                      </span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-600 font-bold">
                                        Status:{" "}
                                      </span>
                                      <span className="font-bold">
                                        {product?.status}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                                <div className="flex items-center gap-2 mt-4">
                                  <Trash2 className="text-gray-600 w-5 h-5 cursor-pointer" />
                                  <Heart className="text-gray-600 w-5 h-5 cursor-pointer" />
                                </div>
                                <AddToCartBtn
                                  product={product}
                                  className="w-36 rounded-full"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <button
                      onClick={handleReset}
                      className="bg-red-500 text-white px-5 py-2 rounded-md font-bold hover:bg-red-800 mt-5"
                    >
                      Reset Cart
                    </button>
                  </div>
                </div>

                {/* 🧾 ملخص الطلب */}
                <div className="">
                  <div className="md:h-1/2 rounded-lg flex flex-col space-y-4 order-first md:order-none mt-6 md:mt-0 border bg-white p-5 ">
                    <h1 className="font-bold text-2xl">Order Summary</h1>
                    <div className="flex justify-between items-center">
                      <h2 className="text-shop_light_text text-lg">
                        SubTotal:
                      </h2>
                      <PriceFormatter amount={getTotalPrice()} />
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-shop_light_text text-lg">
                        Discount:
                      </h2>
                      <PriceFormatter amount={0} />
                    </div>
                    <hr />
                    <div className="flex justify-between items-center">
                      <h2 className="text-black font-bold text-xl">Total</h2>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-xl"
                      />
                    </div>
                    <Button
                      disabled={loading}
                      onClick={handleCheckout}
                      size="lg"
                      className="bg-[#386454] text-white w-full rounded-4xl py-3 font-bold hover:bg-shop_dark_green"
                    >
                      {loading ? "please wait..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                  <div className="mt-10 mb-10">
                    {addresses && (
                      <div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              defaultValue={addresses
                                ?.find((addr) => addr.default)
                                ?._id.toString()}
                            >
                              {addresses?.map((address) => (
                                <div
                                  key={address?._id}
                                  onClick={() => setSelectedAddress(address)}
                                  className="flex justify-center items-center gap-2"
                                >
                                  <RadioGroupItem
                                    value={address?._id.toString()}
                                  />
                                  <Label
                                    htmlFor={`address-${address._id}`}
                                    className="grid gap-1.5 flex-1"
                                  >
                                    <span className="font-semibold">
                                      {address.name}
                                    </span>
                                    <span className="text-sm text-black/60">
                                      {address.address},{address.city}{" "}
                                      {address.state} {address.zip}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button
                              variant="outline"
                              className="w-full mt-4"
                              onClick={fetchAddress}
                            >
                              Add New Address
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
}
