"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToWishListButton from "./AddToWishListButton";
import { Title } from "./text";
import PriceView from "./PriceView";
import AddToCartBtn from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="text-base border-[1px] border-dark_blue/20 rounded-xl bg-shop_light_bg mx-2 my-2">
      <div className="relative group overflow-hidden py-5">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              alt="ProductImage"
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-64 object-contain overflow-hidden  hoverEffect ${product.stock !== 0 ? "group-hover:scale-105" : "opacity-80"}`}
            />
          </Link>
        )}
        <AddToWishListButton
          product={product}
          className="absolute top-2 right-2"
        />
        {product?.status === "sale" && (
          <p className="absolute top-2 left-2 z-50 text-sm border border-darkcolor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect">
            Sale!
          </p>
        )}
        {product?.status === "new" && (
          <p className="absolute top-2 left-2 z-50 text-sm border border-darkcolor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect">
            New!
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-50 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 bg-white">
        <div className="flex flex-col  gap-2">
          {product?.categories && (
            <span className="uppercase text-xs line-clamp-1 text-shop_light_text  ">
              {product.categories?.map((c) => c).join(", ")}
            </span>
          )}

          <Title className="text-sm line-clamp-1">{product?.name}</Title>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={
                    index < 4 ? "text-shop_light_green" : "text-shop_light_text"
                  }
                  fill={index < 4 ? "#93d991" : "#ababab"}
                  size={10}
                />
              ))}
            </div>
            <span className="text-xs text-shop_light_text font-semibold">
              5 Reviews
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-sm">In Stock</h1>
            <span
              className={`${product?.stock !== 0 ? "text-shop_light_green" : "text-red-600"} font-bold`}
            >
              {(product.stock as number) > 0 ? product.stock : "unavilable"}
            </span>
          </div>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-wm"
          />
          <div>
            <AddToCartBtn product={product} className="w-36 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
