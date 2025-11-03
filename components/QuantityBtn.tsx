import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}
const QuantityBtn = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const isOutOfStock = product?.stock === 0;
  const itemCount = getItemCount(product._id);
  const handleIncrement = () => {
    addItem(product);
    toast.success(`${product.name?.substring(0, 12)}... Added Successfully!`);
  };
  const handleDecrement = () => {
    removeItem(product._id);
    toast.error(`${product.name?.substring(0, 12)}... Removed Successfully!`);
  };
  return (
    <div>
      <div className={cn("flex items-center gap-2 pb-1 text-base", className)}>
        <Button
          variant="outline"
          size="icon"
          disabled={itemCount === 0 || isOutOfStock}
          className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
          onClick={handleDecrement}
        >
          <Minus />
        </Button>
        <span className="text-shop_dark_green text-lg font-bold">
          {itemCount}
        </span>
        <Button
          variant="outline"
          size="icon"
          disabled={isOutOfStock}
          className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
          onClick={handleIncrement}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default QuantityBtn;
