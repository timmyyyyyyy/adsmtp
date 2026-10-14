"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState, useCallback } from "react";
import Container from "../Container";
import CategoryList from "./CategoryList";
import {
  Filter,
  X,
  Check,
  Truck,
  ShieldCheck,
  Lock,
  Headset,
  CreditCard,
} from "lucide-react";
import ProductCard from "../ProductCard";
import NoProductAvailable from "../product/NoProductAvailable";
import BrandList from "./BrandList";
import { useSearchParams } from "next/navigation";
import PriceList from "./PriceList";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 🔥 TEMPORÁRIO: categorias de teste enquanto Sanity não carrega
  const testCategories = categories?.length > 0 ? categories : [
    { _id: "1", title: "Ar-Condicionado", slug: { current: "ar-condicionado" } },
    { _id: "2", title: "Refrigeração", slug: { current: "refrigeracao" } },
    { _id: "3", title: "Segurança Eletrónica", slug: { current: "seguranca-eletronica" } },
    { _id: "4", title: "Internet Starlink", slug: { current: "internet-starlink" } },
  ];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000000;

      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
        *[_type == 'product' 
          && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
          && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
          && price >= $minPrice && price <= $maxPrice
        ] 
        | order(name asc) {
          ...,"categories": categories[]->title
        }
      `;

      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, selectedPrice]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="relative bg-shop_dark_green text-white py-12 lg:py-16 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-shop_orange rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-shop_light_green rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Loja Online</h1>
            <div className="w-24 h-1 bg-shop_orange mx-auto mb-5 rounded-full"></div>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
              Produtos de qualidade com garantia e entrega rápida em Maputo e Matola.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-6">
        {/* Mobile Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showMobileFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl max-h-[80vh] overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="divide-y">
                  <CategoryList
                    categories={testCategories as any}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />

                  <PriceList
                    setSelectedPrice={setSelectedPrice}
                    selectedPrice={selectedPrice}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Categorias */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-shop_orange text-white px-4 py-3 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Categorias
                  </h3>
                </div>
                <div className="divide-y">
                  <CategoryList
                    categories={testCategories as any}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>
              </div>

              {/* Porquê */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-shop_orange text-white px-4 py-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    Porquê comprar connosco?
                  </h3>
                </div>
                <ul className="p-4 space-y-3 text-sm">
                  {[
                    "Produtos 100% Originais",
                    "Garantia de Qualidade",
                    "Entrega Rápida",
                    "Assistência Técnica",
                    "Pagamento na Entrega",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-shop_orange flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Marcas + Preços */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <BrandList
                  brands={brands}
                  setSelectedBrand={setSelectedBrand}
                  selectedBrand={selectedBrand}
                />
                <PriceList
                  setSelectedPrice={setSelectedPrice}
                  selectedPrice={selectedPrice}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
              <p className="text-sm text-gray-600">
                Exibindo{" "}
                <span className="font-semibold text-shop_dark_green">
                  {products.length > 0 ? 1 : 0}–{products.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-shop_dark_green">
                  {products.length}
                </span>{" "}
                produtos
              </p>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:border-shop_orange">
                <option>Ordenar por: Mais recentes</option>
                <option>Preço: Menor para Maior</option>
                <option>Preço: Maior para Menor</option>
                <option>Nome: A-Z</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12">
                <NoProductAvailable className="bg-transparent" />
              </div>
            )}

            {/* Rodapé Benefícios */}
            <div className="mt-10 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                {[
                  { icon: Truck, title: "ENTREGA RÁPIDA", sub: "Maputo e Matola" },
                  { icon: ShieldCheck, title: "GARANTIA", sub: "Produtos com garantia" },
                  { icon: Lock, title: "COMPRA SEGURA", sub: "Seus dados protegidos" },
                  { icon: Headset, title: "SUPORTE TÉCNICO", sub: "Assistência especializada" },
                  { icon: CreditCard, title: "PAGAMENTO", sub: "Na entrega ou transferência" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-shop_light_bg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-shop_dark_green" />
                      </div>
                      <h4 className="text-xs font-bold text-shop_dark_green">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-tight">{item.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;