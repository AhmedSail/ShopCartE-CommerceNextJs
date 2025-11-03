import ShopPage from "@/components/ShopPage";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React from "react";

const page = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className="mt-20 bg-white">
      <ShopPage categories={categories} brands={brands} />
    </div>
  );
};

export default page;
