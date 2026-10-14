import { Dispatch, SetStateAction } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

// ✅ Intervalos de preço em Meticais (MT)
const priceArray = [
  { title: "Até 10.000 MT", value: "0-10000" },
  { title: "10.000 - 20.000 MT", value: "10000-20000" },
  { title: "20.000 - 40.000 MT", value: "20000-40000" },
  { title: "40.000 - 60.000 MT", value: "40000-60000" },
  { title: "Acima de 60.000 MT", value: "60000-10000000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: Dispatch<SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="p-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Intervalo de Preço
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {priceArray.length}
        </span>
      </div>

      <RadioGroup className="space-y-1" value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="group flex items-center space-x-3 px-2 py-1 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="border-gray-300 text-shop_orange focus:ring-shop_orange"
            />
            <Label
              htmlFor={price.value}
              className={`flex-1 cursor-pointer transition-colors duration-150 ${
                selectedPrice === price?.value
                  ? "font-medium text-shop_orange"
                  : "text-gray-700 group-hover:text-gray-900"
              }`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPrice && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPrice(null);
          }}
          className="mt-4 text-xs font-medium text-gray-600 hover:text-shop_orange underline underline-offset-2 decoration-1 transition-colors duration-150"
        >
          Limpar filtro de preço
        </button>
      )}
    </div>
  );
};

export default PriceList;