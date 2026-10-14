import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = memo(({ amount, className }: Props) => {
  const value = Number(amount) || 0;

  const formattedPrice = `${value.toLocaleString("pt-MZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MT`;

  return (
    <span
      className={twMerge("text-sm font-semibold text-dark-color", className)}
    >
      {formattedPrice}
    </span>
  );
});

PriceFormatter.displayName = "PriceFormatter";

export default PriceFormatter;