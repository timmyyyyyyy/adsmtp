"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { client } from "@/sanity/lib/client";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants";
import NoProductAvailable from "./product/NoProductAvailable";
import {
  Grid3X3,
  LayoutGrid,
  List,
  Filter,
  SortAsc,
  Eye,
} from "lucide-react";
import Container from "./Container";
import { ALL_PRODUCTS_QUERYResult } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductGridSkeleton } from "./ProductSkeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

type ViewMode = "grid-2" | "grid-3" | "grid-4" | "grid-5" | "list";
type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "newest";

const MAX_PRICE = 100000;

const ProductGrid = () => {
  const [products, setProducts] = useState<ALL_PRODUCTS_QUERYResult>([]);
  const [filteredProducts, setFilteredProducts] =
    useState<ALL_PRODUCTS_QUERYResult>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid-5");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [productsPerPage] = useState(20);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [stockStatus, setStockStatus] = useState<string>("all");
  const [rating, setRating] = useState<string>("all");

  function getSortQuery(sort: SortOption): string {
    switch (sort) {
      case "name-asc":
        return "name asc";
      case "name-desc":
        return "name desc";
      case "price-asc":
        return "price asc";
      case "price-desc":
        return "price desc";
      case "newest":
        return "_createdAt desc";
      default:
        return "name asc";
    }
  }

  // ✅ Encontra o slug correto no productType
  const selectedSlug = productType.find(
    (t) => t.title.toLowerCase() === selectedTab.toLowerCase()
  )?.value;

  // ✅ Query: filtra por slug da categoria
  const query =
    selectedSlug === "all"
      ? `*[_type == "product"] | order(${getSortQuery(sortBy)}){
          ...,"categories": categories[]->title
        }`
      : `*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] | order(${getSortQuery(sortBy)}){
          ...,"categories": categories[]->title
        }`;

  const params = selectedSlug === "all" ? {} : { slug: selectedSlug };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(await response);
        setFilteredProducts(await response);
      } catch (error) {
        console.log("Erro ao carregar produtos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab, sortBy]);

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...products];

    if (priceRange[0] > 0 || priceRange[1] < MAX_PRICE) {
      filtered = filtered.filter((product) => {
        const price = product.price || 0;
        const finalPrice = product.discount
          ? price - price * (product.discount / 100)
          : price;
        return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
      });
    }

    if (stockStatus !== "all") {
      filtered = filtered.filter((product) => {
        if (stockStatus === "in-stock") {
          return (product.stock || 0) > 0;
        } else if (stockStatus === "out-of-stock") {
          return (product.stock || 0) === 0;
        }
        return true;
      });
    }

    if (rating !== "all") {
      filtered = filtered.filter((product) => {
        if (rating === "5") return product.status === "hot";
        if (rating === "4")
          return product.status === "hot" || product.status === "new";
        if (rating === "3")
          return (
            product.status === "hot" ||
            product.status === "new" ||
            product.status === "sale"
          );
        return true;
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [products, priceRange, stockStatus, rating]);

  const getGridClasses = () => {
    switch (viewMode) {
      case "grid-2":
        return "grid-cols-1 sm:grid-cols-2 gap-6";
      case "grid-3":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";
      case "grid-4":
        return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
      case "grid-5":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3";
      case "list":
        return "grid-cols-1 gap-4";
      default:
        return "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
    }
  };

  const ViewModeButton = ({
    mode,
    icon,
    label,
  }: {
    mode: ViewMode;
    icon: React.ReactNode;
    label: string;
  }) => (
    <Button
      variant={viewMode === mode ? "default" : "outline"}
      size="sm"
      onClick={() => setViewMode(mode)}
      className={`p-2 hoverEffect ${
        viewMode === mode
          ? "bg-[#2d2a7d] hover:bg-[#e30613] border-[#2d2a7d] text-white"
          : "hover:border-[#2d2a7d] hover:text-[#2d2a7d]"
      }`}
      title={label}
    >
      {icon}
    </Button>
  );

  return (
    <Container className="flex flex-col lg:px-0 mt-16 lg:mt-24">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-[#2d2a7d] to-[#e30613] rounded-full"></div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#2d2a7d]">
            Produtos em Destaque
          </h2>
          <div className="h-1 w-12 bg-gradient-to-l from-[#2d2a7d] to-[#e30613] rounded-full"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Veja quais são os nossos produtos em destaque.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#2d2a7d]/10 p-6 mb-8">
        <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#2d2a7d] hidden sm:block">
                Ver:
              </span>
              <div className="flex items-center gap-1">
                <ViewModeButton
                  mode="grid-2"
                  icon={<Grid3X3 size={16} />}
                  label="2 Colunas"
                />
                <ViewModeButton
                  mode="grid-3"
                  icon={<LayoutGrid size={16} />}
                  label="3 Colunas"
                />
                <ViewModeButton
                  mode="grid-4"
                  icon={<LayoutGrid size={16} />}
                  label="4 Colunas"
                />
                <ViewModeButton
                  mode="grid-5"
                  icon={<LayoutGrid size={16} />}
                  label="5 Colunas"
                />
                <ViewModeButton
                  mode="list"
                  icon={<List size={16} />}
                  label="Vista em Lista"
                />
              </div>
            </div>

            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 hoverEffect ${
                showFilters
                  ? "bg-[#2d2a7d] hover:bg-[#e30613] border-[#2d2a7d] text-white"
                  : "hover:border-[#2d2a7d] hover:text-[#2d2a7d]"
              }`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SortAsc size={16} className="text-gray-500" />
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-48 border-gray-200 focus:border-[#2d2a7d]">
                  <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                  <SelectItem value="price-asc">
                    Preço (Menor para Maior)
                  </SelectItem>
                  <SelectItem value="price-desc">
                    Preço (Maior para Menor)
                  </SelectItem>
                  <SelectItem value="newest">Mais Recentes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye size={16} />
              <Badge
                variant="secondary"
                className="bg-[#2d2a7d]/10 text-[#2d2a7d]"
              >
                {filteredProducts.length} produtos
              </Badge>
            </div>
          </div>
        </div>

        {/* Filtros Avançados */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Separator className="my-6" />
              <Card className="border-[#2d2a7d]/20 bg-gradient-to-br from-white via-gray-50/30 to-[#2d2a7d]/5">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#2d2a7d] flex items-center gap-2 mb-2">
                      🎯 Filtros Avançados
                    </h3>
                    <p className="text-sm text-gray-500">
                      Refine a sua pesquisa para encontrar exatamente o que
                      procura
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Preço */}
                    <div className="space-y-4 p-4 bg-white rounded-xl border border-[#2d2a7d]/10 shadow-sm">
                      <Label className="text-sm font-bold text-[#2d2a7d]">
                        💰 Intervalo de Preço
                      </Label>
                      <div className="space-y-4">
                        <div className="px-2">
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            max={MAX_PRICE}
                            min={0}
                            step={100}
                            className="w-full"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Label className="text-xs text-gray-500">
                              Preço Mínimo
                            </Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={priceRange[0]}
                              onChange={(e) =>
                                setPriceRange([
                                  parseInt(e.target.value) || 0,
                                  priceRange[1],
                                ])
                              }
                              className="h-9"
                            />
                          </div>
                          <div className="text-gray-400 font-bold pt-5">-</div>
                          <div className="flex-1">
                            <Label className="text-xs text-gray-500">
                              Preço Máximo
                            </Label>
                            <Input
                              type="number"
                              placeholder={MAX_PRICE.toString()}
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([
                                  priceRange[0],
                                  parseInt(e.target.value) || MAX_PRICE,
                                ])
                              }
                              className="h-9"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge className="bg-[#2d2a7d]/10 text-[#2d2a7d] border-[#2d2a7d]/30">
                            {priceRange[0].toLocaleString("pt-MZ")} -{" "}
                            {priceRange[1].toLocaleString("pt-MZ")} MT
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="space-y-4 p-4 bg-white rounded-xl border border-[#2d2a7d]/10 shadow-sm">
                      <Label className="text-sm font-bold text-[#2d2a7d]">
                        📦 Estado do Stock
                      </Label>
                      <Select
                        value={stockStatus}
                        onValueChange={setStockStatus}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecionar estado..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              Todos os Produtos
                            </span>
                          </SelectItem>
                          <SelectItem value="in-stock">
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Em Stock
                            </span>
                          </SelectItem>
                          <SelectItem value="out-of-stock">
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Sem Stock
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Qualidade */}
                    <div className="space-y-4 p-4 bg-white rounded-xl border border-[#2d2a7d]/10 shadow-sm">
                      <Label className="text-sm font-bold text-[#2d2a7d]">
                        🏆 Qualidade do Produto
                      </Label>
                      <Select value={rating} onValueChange={setRating}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecionar qualidade..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            <span className="flex items-center gap-2">
                              🛍️ Todos os Produtos
                            </span>
                          </SelectItem>
                          <SelectItem value="5">
                            <span className="flex items-center gap-2">
                              🔥 Produtos Hot (Premium)
                            </span>
                          </SelectItem>
                          <SelectItem value="4">
                            <span className="flex items-center gap-2">
                              ✨ Novos & Hot
                            </span>
                          </SelectItem>
                          <SelectItem value="3">
                            <span className="flex items-center gap-2">
                              🛍️ Todos Disponíveis
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-3 justify-end p-4 bg-gradient-to-br from-[#2d2a7d]/5 to-[#e30613]/5 rounded-xl border border-[#2d2a7d]/10">
                      <Label className="text-sm font-bold text-[#2d2a7d] text-center">
                        Ações Rápidas
                      </Label>
                      <Button
                        className="w-full bg-[#2d2a7d] hover:bg-[#e30613] text-white font-semibold"
                        onClick={() => applyFilters()}
                      >
                        ✨ Aplicar Filtros ({filteredProducts.length})
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#2d2a7d]/30 hover:bg-[#2d2a7d]/10 text-[#2d2a7d]"
                        onClick={() => {
                          setPriceRange([0, MAX_PRICE]);
                          setStockStatus("all");
                          setRating("all");
                        }}
                      >
                        🗑️ Limpar Filtros
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      {loading ? (
        <ProductGridSkeleton />
      ) : filteredProducts?.length ? (
        <div className={`grid ${getGridClasses()}`}>
          <AnimatePresence mode="popLayout">
            {filteredProducts
              ?.slice(0, productsPerPage)
              .map((product, index) => (
                <motion.div
                  key={product?._id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    layout: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}

      {/* Load More */}
      {filteredProducts?.length > productsPerPage && (
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="px-8 py-3 bg-[#2d2a7d] hover:bg-[#e30613] text-white font-semibold rounded-full"
          >
            Carregar Mais Produtos
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ProductGrid;