import React from "react";
import { Title } from "./text";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100-$200", value: "100-200" },
  { title: "$200-$300", value: "200-300" },
  { title: "$300-$400", value: "300-400" },
  { title: "$400-$500", value: "400-500" },
  { title: "Over $500", value: "500-10000" },
];
const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white">
      <Title className="ml-2 text-xl mt-5">Price</Title>
      <RadioGroup className="mt-2 ml-5 " value={selectedPrice || ""}>
        {priceArray.map((p, i) => (
          <label
            key={i}
            onClick={() => setSelectedPrice(p.value)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          >
            <RadioGroupItem
              value={p.value}
              id={p.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={p.value}
              className={`${selectedPrice === p.value ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {p.title}
            </Label>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
