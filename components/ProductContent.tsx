"use client";
import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/common/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import ProductsDetails from "@/components/ProductsDetails";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ProductSpecs from "@/components/ProductSpecs";
import { trackProductView } from "@/lib/analytics";

import { Product } from "@/sanity.types";
import {
  Truck,
  Shield,
  MessageCircle,
  Headset,
} from "lucide-react";
import React, { useEffect } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ProductAnimationWrapper,
  ProductImageWrapper,
  ProductDetailsWrapper,
  ProductActionWrapper,
  ProductSectionWrapper,
} from "@/components/ProductClientWrapper";
import RelatedProducts from "./RelatedProducts";
import { BRAND_QUERYResult } from "@/sanity.types";

interface ProductContentProps {
  product: Product;
  relatedProducts: Product[];
  brand: BRAND_QUERYResult | null;
}

const ProductContent = ({
  product,
  relatedProducts,
  brand,
}: ProductContentProps) => {
  // WhatsApp
  const whatsappNumber = "258844974637";
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto:\n\n*${product?.name}*\n💰 ${product?.price?.toLocaleString("pt-MZ")} MT\n\nPodem dar-me mais informações?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    if (product) {
      trackProductView({
        productId: product._id,
        name: product.name || "Unknown",
      });
    }
  }, [product]);

  return (
    <ProductAnimationWrapper>
      <Container>
        <DynamicBreadcrumb
          productData={{
            name: product?.name || "",
            slug: product?.slug?.current || "",
          }}
        />

        <div className="flex flex-col md:flex-row gap-10 pb-6">
          {/* Imagens */}
          {product?.images && (
            <ProductImageWrapper>
              <ImageView images={product?.images} isStock={product?.stock} />
            </ProductImageWrapper>
          )}

          {/* Detalhes */}
          <ProductDetailsWrapper>
            {/* Título e Marca */}
            <div className="space-y-3">
              {product?.brand && (
                <Badge className="bg-[#2d2a7d]/10 text-[#2d2a7d] hover:bg-[#2d2a7d]/20 w-fit">
                  {brand && brand.length > 0 && (
                    <span className="font-semibold tracking-wide">
                      {brand[0]?.brandName}
                    </span>
                  )}
                </Badge>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-[#2d2a7d] leading-tight">
                {product?.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Preço */}
            <div className="space-y-4 border-t border-b border-gray-200 py-6 bg-white/70 rounded-lg px-4">
              <PriceView
                price={product?.price}
                discount={product?.discount}
                className="text-2xl font-bold"
              />

              {/* Stock */}
              <div className="flex items-center gap-3">
                <Badge
                  className={`text-sm font-semibold ${
                    product?.stock === 0
                      ? "bg-red-100 text-red-700 hover:bg-red-100"
                      : product?.stock && product.stock < 10
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      : "bg-green-100 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {product?.stock === 0
                    ? "Sem Stock"
                    : product?.stock && product.stock < 10
                    ? `Apenas ${product.stock} disponíveis!`
                    : "Em Stock"}
                </Badge>
              </div>

              {/* Desconto */}
              {product?.discount && product.discount > 0 && (
                <div className="bg-[#e30613]/10 text-[#e30613] px-3 py-2 rounded-lg text-sm font-medium">
                  💰 Poupe {product.discount}% neste produto!
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <ProductActionWrapper delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
                <AddToCartButton product={product} />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir via WhatsApp
                </a>
                <FavoriteButton showProduct={true} product={product} />
              </div>
            </ProductActionWrapper>

            {/* Características */}
            <ProductActionWrapper delay={0.4}>
              <ProductCharacteristics product={product} brand={brand} />
            </ProductActionWrapper>

            {/* Links de Ação */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
              <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e30613] transition-colors">
                <RxBorderSplit className="text-lg" />
                <span>Comparar</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e30613] transition-colors"
              >
                <FaRegQuestionCircle className="text-lg" />
                <span>Perguntar</span>
              </a>
              <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e30613] transition-colors">
                <TbTruckDelivery className="text-lg" />
                <span>Entrega e Devolução</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e30613] transition-colors">
                <FiShare2 className="text-lg" />
                <span>Partilhar</span>
              </button>
            </div>

            {/* Info de Entrega */}
            <ProductActionWrapper delay={0.5}>
              <div className="flex flex-col">
                <div className="border border-gray-200 border-b-0 p-4 flex items-center gap-3 bg-white/70 rounded-t-lg">
                  <Truck size={32} className="text-[#e30613]" />
                  <div>
                    <p className="text-lg font-semibold text-[#2d2a7d]">
                      Entrega Rápida
                    </p>
                    <p className="text-sm text-gray-500">
                      Entregamos em <strong>Maputo e Matola</strong>. Consulte-nos para outras zonas.
                    </p>
                  </div>
                </div>
                <div className="border border-gray-200 p-4 flex items-center gap-3 bg-white/70 rounded-b-lg">
                  <Shield size={32} className="text-[#e30613]" />
                  <div>
                    <p className="text-lg font-semibold text-[#2d2a7d]">
                      Garantia e Suporte
                    </p>
                    <p className="text-sm text-gray-500">
                      Todos os produtos com <strong>garantia</strong> e suporte técnico especializado.
                    </p>
                  </div>
                </div>
              </div>
            </ProductActionWrapper>
          </ProductDetailsWrapper>
        </div>

        {/* Detalhes do Produto */}
        <ProductSectionWrapper delay={0.6}>
          <ProductsDetails />
        </ProductSectionWrapper>

        {/* Indicadores de Confiança */}
        <ProductSectionWrapper delay={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
            <Card className="border-2 border-gray-100 text-center p-4 hover:border-[#2d2a7d]/30 transition">
              <Headset className="h-8 w-8 text-[#2d2a7d] mx-auto mb-2" />
              <h3 className="font-semibold text-[#2d2a7d] mb-1">
                Suporte Técnico
              </h3>
              <p className="text-sm text-gray-600">
                Assistência especializada em todos os produtos
              </p>
            </Card>

            <Card className="border-2 border-gray-100 text-center p-4 hover:border-[#2d2a7d]/30 transition">
              <Truck className="h-8 w-8 text-[#2d2a7d] mx-auto mb-2" />
              <h3 className="font-semibold text-[#2d2a7d] mb-1">
                Entrega Rápida
              </h3>
              <p className="text-sm text-gray-600">
                Entrega em Maputo e Matola
              </p>
            </Card>

            <Card className="border-2 border-gray-100 text-center p-4 hover:border-[#2d2a7d]/30 transition">
              <Shield className="h-8 w-8 text-[#2d2a7d] mx-auto mb-2" />
              <h3 className="font-semibold text-[#2d2a7d] mb-1">
                Garantia de Qualidade
              </h3>
              <p className="text-sm text-gray-600">
                Produtos originais com garantia
              </p>
            </Card>
          </div>
        </ProductSectionWrapper>

        {/* Especificações */}
        <ProductSectionWrapper delay={0.8}>
          <ProductSpecs product={product} />
        </ProductSectionWrapper>

        {/* Produtos Relacionados */}
        <ProductSectionWrapper delay={0.9}>
          <RelatedProducts
            currentProduct={product}
            relatedProducts={relatedProducts}
          />
        </ProductSectionWrapper>
      </Container>
    </ProductAnimationWrapper>
  );
};

export default ProductContent;