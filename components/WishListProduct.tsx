"use client";
import useStore from "@/store";
import React, { useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddToCartBtn from "./AddToCartButton";
import Swal from "sweetalert2";

const WishListProduct = () => {
  const [visibleProduct, setVisibleProduct] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProduct((prev) => Math.min(prev + 5, favoriteProduct.length));
  };
  const handleClose = (id) => {
    Swal.fire({
      title: "Are you sure remove this product from Wishlist?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Removed!",
          text: "Your product has been removed.",
          icon: "success",
        });
        removeFromFavorite(id);
      }
    });
  };
  return (
    <div>
      <Container>
        <div>
          {favoriteProduct.length === 0 ? (
            <div className="text-center space-y-4 flex flex-col content-center items-center ">
              <Heart size={50} className="text-shop_light_text mt-24" />
              <h2 className="text-3xl font-semibold">Your wishlist is empty</h2>
              <p className="text-gray-500">
                Items added to your wishlist will appear here
              </p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2 bg-[#386454] font-bold text-white rounded-md hover:bg-shop_dark_green  mb-24 hoverEffect"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-hidden">
              {/* جدول للـ Desktop */}
              <table className="w-full border-collapse mb-10 border-b hidden md:table">
                <thead className="border-b ">
                  <tr className="bg-black/80 text-white">
                    <th>Image</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteProduct.slice(0, visibleProduct).map((fp) => (
                    <tr
                      key={fp._id}
                      className="border-b text-center last:border-0"
                    >
                      <td className="py-2 flex justify-start items-center gap-4">
                        <button
                          onClick={() => handleClose(fp._id)}
                          className="text-red-500 font-bold"
                        >
                          x
                        </button>
                        <Image
                          src={urlFor(fp?.images[0]).url()}
                          alt={fp?.title || "Product Image"}
                          width={80}
                          height={80}
                        />
                        <h1 className="font-semibold font-mono">{fp.name}</h1>
                      </td>
                      <td className="text-sm font-mono uppercase">
                        {fp?.categories || "—"}
                      </td>
                      <td className="font-semibold font-mono">
                        {fp?._type || "—"}
                      </td>
                      <td className="text-shop_light_green">
                        {fp?.status || "Available"}
                      </td>
                      <td className="font-bold">
                        ${fp?.price?.toFixed(2) || "—"}
                      </td>
                      <td>
                        <AddToCartBtn product={fp} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* عرض كبطاقات للـ Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden mt-4">
                {favoriteProduct.slice(0, visibleProduct).map((fp) => (
                  <div
                    key={fp._id}
                    className="border p-4 rounded-md shadow-sm mb-10"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="font-semibold">{fp.name}</h1>
                      <button
                        onClick={() => handleClose(fp._id)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </div>
                    <Image
                      src={urlFor(fp?.images[0]).url()}
                      alt={fp?.title || "Product Image"}
                      width={300}
                      height={200}
                      className="rounded-md object-cover w-full h-auto"
                    />
                    <div className="mt-2 text-sm space-y-1">
                      <p>
                        <strong>Category:</strong> {fp?.categories || "—"}
                      </p>
                      <p>
                        <strong>Type:</strong> {fp?._type || "—"}
                      </p>
                      <p>
                        <strong>Status:</strong> {fp?.status || "Available"}
                      </p>
                      <p>
                        <strong>Price:</strong> ${fp?.price?.toFixed(2) || "—"}
                      </p>
                    </div>
                    <div className="mt-3">
                      <AddToCartBtn product={fp} />
                    </div>
                  </div>
                ))}
              </div>

              {/* زر تحميل المزيد */}
              {visibleProduct < favoriteProduct.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={loadMore}
                    className="px-6 py-2 bg-shop_dark_green text-white rounded-md hover:bg-shop_light_green"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default WishListProduct;
