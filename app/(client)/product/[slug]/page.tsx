// app/product/[slug]/page.tsx

import { getProductBySlug } from "@/sanity/queries";
import { notFound } from "next/navigation";
import PriceView from "@/components/PriceView";
import AddToCartBtn from "@/components/AddToCartButton";
import Container from "@/components/Container";
import { StarIcon, Truck } from "lucide-react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Accordion } from "@radix-ui/react-accordion";
import Favorite from "@/components/Favorite";
import ImageView from "@/components/ImageView";
import ProductCharachristic from "@/components/ProductCharachristic";
import { RxBorderSplit } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa"; // ✅ من FontAwesome
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb"; // ✅ من Tabler Icons
import { FiShare2 } from "react-icons/fi"; // ✅ من Feather Icons
import { useState } from "react";
import ReviewsOfProduct from "@/components/ReviewsOfProduct";
import AddToWishListButton from "@/components/AddToWishListButton";
import { PageProps } from "next";
export default async function SingleProductPage({
  params,
}: PageProps<{ slug: string }>) {
  const product = await getProductBySlug(params.slug);
  const isStock = product?.stock > 0;
  const icons = [
    {
      id: 1,
      Icon: RxBorderSplit,
      name: "Compare color",
    },
    {
      id: 2,
      Icon: FaRegQuestionCircle,
      name: "Ask a question",
    },
    {
      id: 3,
      Icon: TbTruckDelivery,
      name: "Delivery & Return",
    },
    {
      id: 4,
      Icon: FiShare2,
      name: "Share",
    },
  ];

  if (!product) return notFound();

  return (
    <Container>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
        {/* Left Side: Images */}
        <div>
          {product.images && (
            <ImageView images={product.images} isStock={product.stock} />
          )}
        </div>

        {/* Right Side: Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-500">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={
                    index < 5 ? "text-shop_light_green" : "text-shop_light_text"
                  }
                  fill={index < 5 ? "#93d991" : "#ababab"}
                  size={10}
                />
              ))}
            </div>
            <span className="text-xs text-black font-semibold">(120)</span>
          </div>

          {/* Price */}
          <PriceView
            price={product.price}
            discount={product.discount}
            className="text-xl font-extrabold"
          />

          {/* Stock Status */}
          <span
            className={`${
              isStock
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            } p-2 rounded-md font-semibold text-sm inline-block`}
          >
            {isStock ? "In Stock" : "Out Of Stock"}
          </span>
          <hr />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <div className="flex-1">
              <AddToCartBtn product={product} className="w-full rounded-sm" />
            </div>
            <div className="w-auto">
              <AddToWishListButton showProduct={true} product={product} />
            </div>
          </div>

          <ProductCharachristic product={product} />
          <hr />
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
            {icons.map(({ id, Icon, name }) => (
              <div
                key={id}
                className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer"
              >
                <Icon className="text-lg" />
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 border border-gray-300 p-2">
            <div className="flex items-center justify-start gap-5">
              <Truck size={30} className="text-shop_orange" />
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">Free Delivery</h1>
                <span className="text-sm text-shop_light_text underline">
                  Enter your Postal code for Delivey Availability.
                </span>
              </div>
            </div>
            <hr />
            <div className="flex items-center justify-start gap-5">
              <BsArrowReturnLeft size={30} className="text-shop_orange" />
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">Return Delivery</h1>
                <span className="text-sm text-shop_light_text ">
                  Free 30days Delivery Returns.{" "}
                  <span className="underline">Details</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewsOfProduct />
    </Container>
  );
}
