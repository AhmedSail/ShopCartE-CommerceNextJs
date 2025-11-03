import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";

const ProductCharachristic = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  if (!product) return null;

  const brand = await getBrand(product?.slug?.current || "");
  console.log("brand", brand);

  return (
    <div className="mt-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="brand">
          <AccordionTrigger className="font-semibold hover:underline cursor-pointer">
            {product?.name}: Characteristics
          </AccordionTrigger>
          <AccordionContent>
            <p className="flex justify-between items-center ">
              Brand:{" "}
              <span className="font-semibold tracking-wide">
                {brand?.brandName}
              </span>
            </p>
            <p className="flex justify-between items-center">
              Collection:{" "}
              <span className="font-semibold tracking-wide">2025</span>
            </p>
            <p className="flex justify-between items-center">
              Type:{" "}
              <span className="font-semibold tracking-wide">
                {product?.variant}
              </span>
            </p>
            <p className="flex justify-between items-center">
              Stock:{" "}
              <span className="font-semibold tracking-wide">
                {product?.stock ? "Available" : "Out Of Stock"}
              </span>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductCharachristic;
