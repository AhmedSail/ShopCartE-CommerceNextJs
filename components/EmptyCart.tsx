"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <ShoppingCart size={48} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-sm text-gray-500 mb-6">
        You haven’t added any products yet. Browse the store and find something
        you like!
      </p>
      <Link
        href="/shop"
        className="hover:bg-white shadow hover:text-shop_dark_green bg-shop_btn_dark_green text-white px-6 py-2 rounded-full font-medium transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
