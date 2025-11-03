import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}
export default function PriceFormatter({ amount, className }: Props) {
  const formattedPrice = new Number(amount).toLocaleString("en-Us", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <span
      className={twMerge("text-sm font-semibold text-darkcolor", className)}
    >
      {formattedPrice}
    </span>
  );
}
