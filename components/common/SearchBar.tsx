"use client";
import { Loader2, Search, X, TrendingUp, Clock, Star } from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { client } from "@/sanity/lib/client";
import { Input } from "../ui/input";
import AddToCartButton from "../AddToCartButton";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import PriceView from "../PriceView";
import Image from "next/image";
import Link from "next/link";
import { useOutsideClick } from "@/hooks";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useOutsideClick<HTMLDivElement>(() => setShowSearch(false));

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      const query = `*[_type == "product" && isFeatured == true] | order(name asc)`;
      const response = await client.fetch(query);
      setFeaturedProduct(response);
    } catch (error) {
      console.error("Erro ao carregar produtos em destaque:", error);
    }
  }, []);

  useEffect(() => {
    if (showSearch === true) {
      fetchFeaturedProducts();
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [showSearch, fetchFeaturedProducts]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSearch) {
        setShowSearch(false);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
        return;
      }
    };

    document.addEventListener("keydown", handleKeydown);

    if (showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "unset";
    };
  }, [showSearch]);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Erro ao pesquisar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [fetchProducts]);

  return (
    <>
      {/* Botão que abre o modal — agora estilo azul E.D.S */}
      <button
        onClick={() => setShowSearch(true)}
        className="group w-full flex items-center gap-3 bg-white hover:bg-gray-50 rounded-full px-4 py-2.5 transition-all duration-200"
        aria-label={`Abrir pesquisa (${isMac ? "Cmd" : "Ctrl"}+K)`}
      >
        <Search className="w-4 h-4 text-gray-400 group-hover:text-[#2d2a7d] transition-colors flex-shrink-0" />
        <span className="text-sm text-gray-500 group-hover:text-[#2d2a7d] transition-colors flex-1 text-left">
          Pesquisar produtos...
        </span>
        <div className="hidden lg:flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-500 font-mono flex-shrink-0">
          <span>{isMac ? "⌘" : "Ctrl"}</span>
          <span>K</span>
        </div>
      </button>

      {/* Modal */}
      {showSearch && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 search-modal-overlay ${
            showSearch ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          <div className="absolute inset-0 w-full h-screen bg-black/60 backdrop-blur-sm" />

          <div
            ref={modalRef}
            className={`relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden search-modal-content ${
              showSearch ? "animate-scaleIn" : "animate-scaleOut"
            }`}
          >
            {/* Header do modal */}
            <div className="bg-gradient-to-r from-[#2d2a7d] to-[#e30613] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Search className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Pesquisar Produtos</h2>
                    <div className="hidden sm:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md border border-white/20">
                      <span className="text-xs font-mono">
                        {isMac ? "Cmd" : "Ctrl"}
                      </span>
                      <span className="text-xs">+</span>
                      <span className="text-xs font-mono">K</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  aria-label="Fechar pesquisa (Escape)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    placeholder="Pesquise os seus produtos..."
                    className="w-full pl-12 pr-16 py-4 text-lg bg-white/10 border-white/20 placeholder:text-white/70 text-white focus:bg-white/20 focus:border-white/40 rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-12 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                    >
                      <X className="w-4 h-4 text-white/70 hover:text-white" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2.5 rounded-lg transition-all duration-200"
                  >
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </div>
              </form>
            </div>

            {/* Conteúdo */}
            <div className="max-h-[60vh] min-h-[50vh] overflow-y-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-[#2d2a7d]">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" />
                  <p className="text-lg font-semibold">A pesquisar produtos...</p>
                  <p className="text-sm text-gray-500">Por favor aguarde</p>
                </div>
              ) : products?.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {products.map((product: Product) => (
                    <div
                      key={product?._id}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          onClick={() => setShowSearch(false)}
                          className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 group-hover:border-[#2d2a7d] transition-colors duration-200"
                        >
                          {product?.images && (
                            <Image
                              width={80}
                              height={80}
                              src={urlFor(product?.images[0]).url()}
                              alt={product.name || "Produto"}
                              className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                                product?.stock === 0
                                  ? "opacity-50 grayscale"
                                  : ""
                              }`}
                            />
                          )}
                          {product?.discount && product.discount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-[#e30613] text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                              -{product.discount}%
                            </div>
                          )}
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            onClick={() => setShowSearch(false)}
                            className="block group-hover:text-[#2d2a7d] transition-colors duration-200"
                          >
                            <h3 className="font-semibold text-base sm:text-lg line-clamp-1 mb-1">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="flex items-center justify-between">
                            <PriceView
                              price={product?.price}
                              discount={product?.discount}
                              className="text-sm sm:text-base"
                            />

                            <div className="flex items-center gap-2">
                              {product?.stock === 0 ? (
                                <span className="text-red-500 text-sm font-medium">
                                  Sem Stock
                                </span>
                              ) : (
                                <AddToCartButton
                                  product={product}
                                  className="px-3 py-1.5 text-sm"
                                />
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            {product?.status === "hot" && (
                              <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                                <TrendingUp className="w-3 h-3" />
                                Oferta
                              </span>
                            )}
                            {product?.status === "new" && (
                              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                <Clock className="w-3 h-3" />
                                Novo
                              </span>
                            )}
                            {product?.isFeatured && (
                              <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
                                <Star className="w-3 h-3" />
                                Destaque
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12">
                  {search === "" ? (
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-2xl p-8 mx-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-[#2d2a7d]/10 p-3 rounded-full">
                            <Search className="w-8 h-8 text-[#2d2a7d]" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Descubra Produtos Incríveis
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Pesquise e explore a nossa gama de produtos
                        </p>

                        {featuredProduct?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 text-left">
                              Mais procurados:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {featuredProduct
                                .slice(0, 6)
                                .map((item: Product) => (
                                  <button
                                    key={item?._id}
                                    onClick={() =>
                                      setSearch(item?.name as string)
                                    }
                                    className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-[#2d2a7d] hover:bg-[#2d2a7d]/5 px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-[#2d2a7d] transition-all duration-200"
                                  >
                                    <Search className="w-3 h-3" />
                                    <span className="line-clamp-1">
                                      {item?.name}
                                    </span>
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-red-50 rounded-2xl p-8 mx-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-red-100 p-3 rounded-full">
                            <X className="w-8 h-8 text-red-500" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Sem resultados encontrados
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Não encontrámos nenhum produto para{" "}
                          <span className="font-semibold text-red-600">
                            &quot;{search}&quot;
                          </span>
                        </p>
                        <button
                          onClick={() => setSearch("")}
                          className="bg-[#2d2a7d] hover:bg-[#e30613] text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
                        >
                          Limpar Pesquisa
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;