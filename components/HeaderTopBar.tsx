"use client";

import Link from "next/link";
import { MessageCircle, Mail, ShoppingCart } from "lucide-react";
import Logo from "./common/Logo";
import SearchBar from "./common/SearchBar";

const HeaderTopBar = () => {
  const cartCount = 0;

  const whatsappNumber = "+258 84 497 4637";
  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

  return (
    <div className="bg-[#2d2a7d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Barra de pesquisa — agora usa o SearchBar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Contactos + Carrinho */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="text-[#fbbf24]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-300 uppercase">
                  WhatsApp
                </span>
                <span className="text-xs font-medium">{whatsappNumber}</span>
              </div>
            </a>

            <a
              href="mailto:edstechnology@tvcabo.co.mz"
              className="hidden lg:flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="text-[#fbbf24]">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-300 uppercase">
                  E-mail
                </span>
                <span className="text-xs font-medium">
                  edstechnology@tvcabo.co.mz
                </span>
              </div>
            </a>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-white" />
                <span className="absolute -top-2 -right-2 bg-[#fbbf24] text-[#2d2a7d] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="hidden sm:block text-xs font-medium">
                Carrinho
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;