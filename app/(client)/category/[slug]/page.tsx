import CategoryProduct from "@/components/CategoryProduct";
import Container from "@/components/Container";
import { Title } from "@/components/text";
import { Category } from "@/sanity.types";
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categories = await getCategories();
  const { slug } = await params;
  return (
    <div className="py-10 mt-[80px]">
      <Container>
        <Title className="md:text-2xl text-black">
          Product By Category:{" "}
          <span className="text-shop_light_green">{slug && slug}</span>
        </Title>
        <CategoryProduct categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
