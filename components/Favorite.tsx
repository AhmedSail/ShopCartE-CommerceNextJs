"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
export default function Favorite({
  showProduct = false,
  product,
  className,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
  className?: string;
}) {
  const { favoriteProduct } = useStore();
  return (
    <div>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w3.5 rounded-full text-xs font-semibold flex items-center justify-center p-1 ">
            {favoriteProduct?.length > 0 ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm">
          <Heart
            className={cn(
              "text-shop_light_green/80 group-hover:text-shop_light_green mt-0.5 w-5 h-5 hoverEffect",
              className
            )}
          />
        </button>
      )}
    </div>
  );
}
