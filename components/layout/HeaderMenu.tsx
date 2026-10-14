"use client";
import { headerData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Wrench,
  ShoppingBag,
  BookOpen,
  Phone,
} from "lucide-react";

const iconMap: Record<string, any> = {
  "/": Home,
  "/about": Info,
  "/help": Wrench,
  "/shop": ShoppingBag,
  "/blog": BookOpen,
  "/contact": Phone,
};

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-full items-center justify-start gap-6 text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide">
      {headerData?.map((item) => {
        const Icon = iconMap[item?.href] || Home;
        const isActive = pathname === item?.href;

        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`group relative flex items-center gap-2 py-3 px-1 transition-colors ${
              isActive
                ? "text-[#2d2a7d]"
                : "text-gray-700 hover:text-[#e30613]"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item?.title}</span>

            {/* Sublinhado verde */}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-[#25D366] transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;