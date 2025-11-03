"use client";

import { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { TabBarData } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProducts from "./NoProductsAvailable";
import { Product } from "@/sanity.types";
import ProductCard from "./productCard";
export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TabBarData[0]?.title || "");

  const query = `*[_type=="product" && variant==$variant]|order(name desc){
  ...,"categories": categories[]->title
}`;

  const params = { variant: selectedTab.toLowerCase() };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.log("Product Fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);
  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        {loading ? (
          <div className="flex flex-col  justify-center items-center py-10 min-h-80 bg-gray-100 w-full gap-5">
            <div className="flex justify-center items-center gap-2 text-blue-400">
              <Loader2 className="animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {products?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-10">
                {products.map((p) => (
                  <div key={p._id}>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ProductCard product={p} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <NoProducts selectedTab={selectedTab} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
