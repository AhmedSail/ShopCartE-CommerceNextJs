"use client";

import { Category } from "@/sanity.types";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Title } from "./text";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: (id: string | null) => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div>
      <Title className="ml-2 text-xl mt-5">Product Category</Title>
      <RadioGroup className="mt-2 ml-5" value={selectedCategory || ""}>
        {categories.map((c) => (
          <label
            key={c._id}
            onClick={() => setSelectedCategory(c?.slug?.current as string)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          >
            <RadioGroupItem
              value={c?.slug?.current as string}
              id={c?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={c?.slug?.current}
              className={`${selectedCategory === c?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {c?.title}
            </Label>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CategoryList;
