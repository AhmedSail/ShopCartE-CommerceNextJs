"use client";
import { Category, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProducts from "./NoProductsAvailable";
interface Props {
  categories: Category[];
  slug: string;
}
const CategoryProduct = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);

    router.push(`/category/${newSlug}`, { scroll: false });
  };
  const fetchProduct = async (categorySlug: string) => {
    setLoading(true);

    try {
      const query = `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
  _id,
  name,
  price,
  discount,
  stock,
  status,
  images,
  "categories": categories[]->title
}`;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct(currentSlug);
  }, [router]);
  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="flex flex-col w-full md:w-44 border border-[#E5E5E5]">
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => handleCategoryChange(c.slug?.current as string)}
              className={`p-2 border-b last:border-0 text-sm font-bold text-left ${
                currentSlug === c.slug?.current
                  ? "bg-shop_orange text-white"
                  : "text-black"
              } hover:text-white hover:bg-shop_orange/50 hoverEffect`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div className="flex-1 ">
          {loading ? (
            <div className="flex flex-col  justify-center items-center py-10 min-h-80 bg-gray-100 w-full gap-5">
              <div className="flex justify-center items-center gap-2 text-blue-400">
                <Loader2 className="animate-spin" />
                <span>Product is loading...</span>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {products.map((p: Product) => (
                <AnimatePresence key={p?._id}>
                  <motion.div>
                    <ProductCard product={p} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <NoProducts selectedTab={currentSlug} className="mt-9 w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
