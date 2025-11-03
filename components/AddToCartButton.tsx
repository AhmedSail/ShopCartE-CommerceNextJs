"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./priceFormatter";
import QuantityBtn from "./QuantityBtn";

interface Props {
  product: Product;
  className?: string;
}
export default function AddToCartBtn({ product, className }: Props) {
  const isOutOfStock = product?.stock === 0;
  const [isClient, setIsClient] = useState(false);
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product._id);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  const handleAddToCart = () => {
    if ((product.stock as number) > itemCount) {
      addItem(product);
      toast.success(`${product.name?.substring(0, 12)}... Added Successfully!`);
    } else {
      toast.error("Can not add more than available stock");
    }
  };
  return (
    <div>
      {itemCount ? (
        <div>
          <div className="text-sm w-full flex items-center justify-between">
            <span className="text-xs text-darkcolor/80">Quantity</span>
            <QuantityBtn product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            `rounded-full w-full font-semibold hover:bg-shop_btn_dark_green hoverEffect cursor-pointer`,
            className
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </Button>
      )}
    </div>
  );
}
