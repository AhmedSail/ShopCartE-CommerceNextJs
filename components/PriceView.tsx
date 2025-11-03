import { cn } from "@/lib/utils";
import PriceFormatter from "./priceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}
export default function PriceView({ price, discount, className }: Props) {
  return (
    <div>
      <div className={cn("flex items-center gap-2", className)}>
        <PriceFormatter
          amount={price}
          className={cn("text-shop_dark_green", className)}
        />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={cn(
              "line-through text-xs font-normal text-shop_light_text",
              className
            )}
          />
        )}
      </div>
    </div>
  );
}
