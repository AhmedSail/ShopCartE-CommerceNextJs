"use client"; // لو كنت تستخدم Next.js 13+ مع App Router

import { Brand, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./text";
import CategoryList from "./CategoryList";
import BrandList from "./BrandList";
import PriceList from "./PriceList";
import { useSearchParams } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProducts from "./NoProductsAvailable";
import ProductCard from "./productCard";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const ShopPage = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
  *[_type == "product"
    && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
    && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
    && price >= $minPrice && price <= $maxPrice
  ]
  | order(name asc){
  ...,"categories":categories[]->title
    
  }
`;
      const params = {
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
      };

      const data = await client.fetch(query, params);
      setProducts(data ?? []);
    } catch (error) {
      console.log("Shop Product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [selectedBrand, selectedCategory, selectedPrice]);
  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the product as you need
            </Title>
            <button
              className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-shop_orange hoverEffect"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
                setSelectedPrice(null);
              }}
            >
              Reset Filters
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50 mt-10">
            <div className="md:sticky md:top-20 md:self-start md:overflow-y-auto md:h-[calc(100vh-160px)] md:min-w-64 pb-5 md:border-r border-r-shop_dark_green/50 scrollbar-hide">
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <BrandList
                brands={brands}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
              />
              <PriceList
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
            </div>
            <div className="flex-1 pt-5">
              <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
                {loading ? (
                  <div className="p-20 flex flex-col  gap-2 items-center justify-center bg-white">
                    <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                    <p className="font-semibold tracking-wide text-base">
                      Loading...
                    </p>
                  </div>
                ) : (
                  <div>
                    {products?.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                        {products.map((p) => (
                          <ProductCard product={p} key={p._id} />
                        ))}
                      </div>
                    ) : (
                      <NoProducts className="bg-white mt-0" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopPage;
