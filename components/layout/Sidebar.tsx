import {
  X,
  Home,
  ShoppingBag,
  BookOpen,
  User,
  ShoppingCart,
  Heart,
  Package,
  Tag,
  Phone,
  HelpCircle,
  Info,
  Grid3X3,
  MessageCircle,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useOutsideClick } from "@/hooks";
import { categoriesData } from "@/constants";
import useStore from "@/store";
import Logo from "../common/Logo";
import SocialMedia from "../common/SocialMedia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  const { items, favoriteProduct } = useStore();

  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

  // Acesso rápido
  const quickAccessItems = [
    { title: "Carrinho", href: "/cart", icon: ShoppingCart, color: "text-[#fbbf24]" },
    { title: "Favoritos", href: "/wishlist", icon: Heart, color: "text-pink-400" },
    { title: "Loja", href: "/shop", icon: ShoppingBag, color: "text-[#25D366]" },
  ];

  // Menu principal
  const mainMenuItems = [
    { title: "Início", href: "/", icon: Home },
    { title: "Serviços", href: "/help", icon: Wrench },
    { title: "Loja", href: "/shop", icon: ShoppingBag },
    { title: "Categorias", href: "/category", icon: Grid3X3 },
    { title: "Blog", href: "/blog", icon: BookOpen },
  ];

  // Suporte
  const supportMenuItems = [
    { title: "Fale Connosco", href: "/contact", icon: Phone },
    { title: "Sobre Nós", href: "/about", icon: Info },
  ];

  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform ease-in-out duration-300`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-[#0f0f1a] z-50 h-screen text-white p-6 border-r border-[#2d2a7d] flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2d2a7d] scrollbar-track-transparent"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2d2a7d]">
          <Logo className="text-white" />
          <button
            onClick={onClose}
            className="hover:text-[#fbbf24] transition-all p-2 rounded-md hover:bg-[#2d2a7d]/30"
          >
            <X size={20} />
          </button>
        </div>

        {/* Acesso Rápido */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#fbbf24] uppercase tracking-wider">
            Acesso Rápido
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              const count =
                item.href === "/cart"
                  ? items?.length || 0
                  : item.href === "/wishlist"
                  ? favoriteProduct?.length || 0
                  : 0;

              return (
                <Link
                  key={item.title}
                  onClick={onClose}
                  href={item.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#2d2a7d]/30 hover:bg-[#2d2a7d]/50 transition-colors duration-200 text-center relative"
                >
                  <Icon size={20} className={item.color} />
                  <span className="text-xs font-medium text-gray-300">
                    {item.title}
                  </span>
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#e30613] text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Menu Principal */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#fbbf24] uppercase tracking-wider">
            Navegação
          </h3>
          <div className="flex flex-col gap-2">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  onClick={onClose}
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 hover:text-[#fbbf24] hover:bg-[#2d2a7d]/30 ${
                    pathname === item.href
                      ? "text-[#fbbf24] bg-[#2d2a7d]/50"
                      : "text-gray-300"
                  }`}
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categorias Populares */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#fbbf24] uppercase tracking-wider">
            Categorias Populares
          </h3>
          <div className="flex flex-col gap-1">
            {categoriesData.slice(0, 6).map((item) => (
              <Link
                onClick={onClose}
                key={item.title}
                href={`/category/${item.href}`}
                className="text-xs font-medium text-gray-400 hover:text-[#fbbf24] transition-colors duration-200 py-1.5 px-2 rounded hover:bg-[#2d2a7d]/20 capitalize"
              >
                {item.title}
              </Link>
            ))}
            <Link
              onClick={onClose}
              href="/category"
              className="text-xs font-semibold text-[#e30613] hover:text-[#fbbf24] transition-colors duration-200 py-1.5 px-2 rounded hover:bg-[#2d2a7d]/20 mt-1"
            >
              Ver Todas as Categorias →
            </Link>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#fbbf24] uppercase tracking-wider">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <a
              onClick={onClose}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/40 transition-colors duration-200 text-center"
            >
              <MessageCircle size={20} className="text-[#25D366]" />
              <span className="text-xs font-medium text-gray-300">
                WhatsApp
              </span>
            </a>
            <Link
              onClick={onClose}
              href="/wishlist"
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#2d2a7d]/30 hover:bg-[#2d2a7d]/50 transition-colors duration-200 text-center"
            >
              <Heart size={20} className="text-pink-400" />
              <span className="text-xs font-medium text-gray-300">
                Favoritos
              </span>
            </Link>
          </div>
        </div>

        {/* Suporte */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#fbbf24] uppercase tracking-wider">
            Suporte
          </h3>
          <div className="flex flex-col gap-2">
            {supportMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  onClick={onClose}
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 hover:text-[#fbbf24] hover:bg-[#2d2a7d]/30 ${
                    pathname === item.href
                      ? "text-[#fbbf24] bg-[#2d2a7d]/50"
                      : "text-gray-300"
                  }`}
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#2d2a7d] my-2"></div>

        {/* Banner Promocional */}
        <div className="bg-gradient-to-r from-[#2d2a7d] to-[#e30613] rounded-lg p-4 text-center">
          <h4 className="text-sm font-bold text-white mb-1">
            Orçamento Grátis!
          </h4>
          <p className="text-xs text-white/90 mb-2">
            Peça já o seu orçamento sem compromisso
          </p>
          <a
            onClick={onClose}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1da851] px-3 py-1 rounded-full transition-colors duration-200"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Redes Sociais */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-[#fbbf24] uppercase tracking-wider mb-3">
            Siga-nos
          </h3>
          <SocialMedia />
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;