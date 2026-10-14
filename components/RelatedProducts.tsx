import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, MessageCircle, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import FavoriteButton from "./FavoriteButton";

interface RelatedProductsProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

const RelatedProducts = memo(({ relatedProducts }: RelatedProductsProps) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  const whatsappNumber = "258844974637";

  return (
    <div className="my-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#2d2a7d] mb-2">
          Também Pode Gostar
        </h2>
        <p className="text-gray-600">
          Produtos semelhantes da mesma categoria
        </p>
        <div className="w-24 h-1 bg-[#e30613] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product: Product) => {
          const imageUrl = product?.images?.[0]
            ? urlFor(product.images[0]).url()
            : null;
          const isInStock = (product?.stock || 0) > 0;

          // WhatsApp por produto
          const whatsappMessage = encodeURIComponent(
            `Olá! Tenho interesse no produto:\n\n*${product?.name}*\n💰 ${product?.price?.toLocaleString("pt-MZ")} MT\n\nPodem dar-me mais informações?`
          );
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

          return (
            <Card
              key={product._id}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#2d2a7d]/30"
            >
              <CardContent className="p-4">
                {/* Imagem */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Link href={`/product/${product?.slug?.current}`}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product?.name || "Produto"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          Sem imagem
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Badge de Desconto */}
                  {product?.discount && product.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-[#e30613] text-white hover:bg-[#c00510]">
                      -{product.discount}%
                    </Badge>
                  )}

                  {/* Sem Stock */}
                  {!isInStock && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600">
                      Sem Stock
                    </Badge>
                  )}

                  {/* Favorito */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-1 hover:bg-white transition-colors">
                      <FavoriteButton product={product} />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <Link
                    href={`/product/${product?.slug?.current}`}
                    className="block hover:text-[#e30613] transition-colors"
                  >
                    <h3 className="font-semibold text-[#2d2a7d] line-clamp-2 text-sm">
                      {product?.name}
                    </h3>
                  </Link>

                  {/* Avaliação */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          size={12}
                          className={`${
                            index < 4
                              ? "text-[#fbbf24] fill-[#fbbf24]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">(4.0)</span>
                  </div>

                  {/* Preço */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#e30613]">
                      {product?.price?.toLocaleString("pt-MZ", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      MT
                    </span>
                  </div>

                  {/* Botões */}
                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="inline-flex items-center justify-center gap-1 border border-gray-300 hover:border-[#2d2a7d] hover:bg-gray-50 text-xs font-medium px-3 py-2 rounded-md transition-colors duration-200 w-full text-[#2d2a7d]"
                    >
                      <ShoppingBag size={14} />
                      Ver Detalhes
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#1da851] text-white text-xs font-medium px-3 py-2 rounded-md transition-colors duration-200 w-full"
                    >
                      <MessageCircle size={14} />
                      Pedir via WhatsApp
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ver Mais */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          className="border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d] hover:text-white"
          asChild
        >
          <Link href="/shop">Ver Mais Produtos</Link>
        </Button>
      </div>
    </div>
  );
});

RelatedProducts.displayName = "RelatedProducts";

export default RelatedProducts;