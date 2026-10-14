import { Dispatch, SetStateAction } from "react";
import { Category } from "@/sanity.types";
import { ChevronRight } from "lucide-react";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <ul className="divide-y divide-gray-100">
      {categories?.map((category) => {
        const isActive = selectedCategory === category?.slug?.current;
        return (
          <li key={category?._id}>
            <button
              onClick={() =>
                setSelectedCategory(
                  isActive ? null : (category?.slug?.current as string)
                )
              }
              className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-shop_orange/10 text-shop_orange font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-shop_orange"></span>
                {category?.title}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </li>
        );
      })}

      {selectedCategory && (
        <li className="px-4 py-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-medium text-gray-500 hover:text-shop_orange underline"
          >
            Limpar filtro
          </button>
        </li>
      )}
    </ul>
  );
};

export default CategoryList;