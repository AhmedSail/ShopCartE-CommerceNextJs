import CategoryProduct from "@/components/CategoryProduct";
import Container from "@/components/Container";
import { Title } from "@/components/text";
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await getCategories();
  const { slug } = await params;
  return (
    <div className="py-10">
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
