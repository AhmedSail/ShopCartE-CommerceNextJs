"use client";

import { Brand } from "@/sanity.types";
import React from "react";
import { Title } from "./text";
import { CheckIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand: (id: string | null) => void;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="space-y-2">
      <Title className="ml-2 text-xl mt-5">Brands</Title>
      <RadioGroup className="mt-2 space-y-2 ml-5" value={selectedBrand || ""}>
        {brands.map((b) => (
          <label
            key={b._id}
            onClick={() => setSelectedBrand(b?.slug?.current as string)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          >
            <RadioGroupItem
              value={b?.slug?.current as string}
              id={b?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={b?.slug?.current}
              className={`${selectedBrand === b?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {b?.title}
            </Label>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
