import Container from "@/components/Container";
import ProductCard from "@/components/productCard";
import { Title } from "@/components/text";
import { getDealProducts } from "@/sanity/queries";
import React from "react";

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className="py-10 bg-deal-bg mt-[80px]">
      <Container>
        <Title className="mb-5 underline decoration-2 text-lg uppercase tracking-wide ">
          Hot Deal Of The Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((p) => (
            <ProductCard key={p?._id} product={p} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
