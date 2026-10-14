import { memo } from "react";
import { Product } from "@/sanity.types";
import PriceView from "./PriceView";
import Link from "next/link";
import Title from "./Title";
import { StarIcon } from "@sanity/icons";
import ProductSideMenu from "./ProductSideMenu";
import { Flame, ShoppingBag, MessageCircle } from "lucide-react";
import { image } from "@/sanity/image";

const ProductCard = memo(({ product }: { product: Product }) => {
  const whatsappNumber = "258844974637";
  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto: *${product?.name}* — ${product?.price?.toLocaleString("pt-MZ")} MT. Podem dar-me mais informações?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="text-sm border rounded-md border-dark-blue/20 group bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <img
              src={image(product.images[0]).size(900, 880).url()}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 
                ${
                  product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"
                }`}
              alt={product?.name || "Produto"}
              loading="lazy"
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border border-dark-color/50 px-2 rounded-full bg-white">
            Promoção!
          </p>
        ) : (
          <p className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full bg-white">
            <Flame size={18} fill="#fb6c08" className="text-shop_orange" />
          </p>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-light-text">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}

        <Title className="text-sm line-clamp-1">{product?.name}</Title>

        {/* Preço */}
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-base font-bold text-shop_orange"
        />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < Math.round(product?.averageRating || 0)
                    ? "text-shop_light_green"
                    : "text-light-text"
                }
                fill={
                  index < Math.round(product?.averageRating || 0)
                    ? "#93D991"
                    : "#ababab"
                }
              />
            ))}
          </div>
          <p className="text-light-text text-xs tracking-wide">
            {product?.totalReviews
              ? `${product.totalReviews} ${
                  product.totalReviews === 1 ? "Avaliação" : "Avaliações"
                }`
              : "Sem avaliações"}
          </p>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2.5">
          <p className="font-medium">Em Stock</p>
          <p
            className={`${
              product?.stock === 0
                ? "text-red-600"
                : "text-shop_dark_green/80 font-semibold"
            }`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "Indisponível"}
          </p>
        </div>

        {/* Botões */}
        <div className="flex items-center gap-2 mt-2">
          <Link
            href={`/product/${product?.slug?.current}`}
            className="flex-1 inline-flex items-center justify-center gap-1 border border-gray-300 hover:border-shop_dark_green hover:bg-gray-50 text-xs font-medium px-3 py-2 rounded-md transition-colors duration-200"
          >
            <ShoppingBag size={14} />
            Ver detalhes
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors duration-200"
          >
            <MessageCircle size={14} />
            Pedir via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;