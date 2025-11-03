"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddToWishListButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { favoriteProduct, addToFavorite, removeFromFavorite } = useStore();
  const [existingProduct, setEexistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (i) => i?._id === product?._id
    );
    setEexistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);
  const handleAddToFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const availableProduct = favoriteProduct?.find(
      (i) => i?._id === product?._id
    );

    if (availableProduct) {
      removeFromFavorite(product._id);
      toast.success("Product Removed Successfully!");
    } else {
      addToFavorite(product).then(() => {
        toast.success("Product Added Successfully!");
      });
    }
  };
  return (
    <div className={cn(className)}>
      <button
        className={`p-2.5 rounded-full hover:bg-shop_btn_dark_green hover:text-white hoverEffect cursor-pointer ${existingProduct ? "bg-shop_dark_green/80 text-white" : ""}`}
        onClick={handleAddToFav}
      >
        <Heart size={15} />
      </button>
    </div>
  );
}
