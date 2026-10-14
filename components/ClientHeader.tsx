"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Container from "./Container";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMenu from "./layout/HeaderMenu";
import MobileMenu from "./layout/MobileMenu";
import SearchBar from "./common/SearchBar";
import CartIcon from "./cart/CartIcon";
import FavoriteButton from "./FavoriteButton";

const ClientHeader = () => {
  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* ===== Barra Superior (preta) ===== */}
      <HeaderTopBar />

      {/* ===== Barra Inferior (branca) ===== */}
      <div className="border-b border-gray-100">
        <Container>
          <div className="flex items-center h-14 lg:h-16">
            {/* Mobile Menu (esquerda) */}
            <div className="flex lg:hidden items-center gap-2 mr-2">
              <MobileMenu />
            </div>

            {/* Menu principal (centro-esquerda) */}
            <div className="hidden lg:flex items-center flex-1">
              <HeaderMenu />
            </div>

            {/* Direita: Pesquisa mobile + Carrinho + CTA */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Barra de pesquisa mobile */}
              <div className="lg:hidden">
                <SearchBar />
              </div>

              {/* Carrinho (mobile) */}
              <div className="lg:hidden">
                <CartIcon />
              </div>

              {/* Favoritos (desktop) */}
              <div className="hidden lg:flex items-center gap-3">
                <FavoriteButton />
              </div>

              {/* Botão CTA "FALAR CONNOSCO" */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-shop_orange hover:bg-shop_light_orange text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-4 py-2.5 rounded-md transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Falar Connosco
              </a>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default ClientHeader;