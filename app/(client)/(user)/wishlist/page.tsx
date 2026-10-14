import Container from "@/components/Container";
import WishlistProducts from "@/components/WishlistProducts";
import { Heart } from "lucide-react";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";

const WishListPage = async () => {
  return (
    <Container className="py-6">
      {/* Breadcrumb */}
      <DynamicBreadcrumb />

      {/* Título da Página */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-50 rounded-full">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2d2a7d]">
            A Minha Lista de Favoritos
          </h1>
          <p className="text-gray-600 mt-1">
            Guarde os produtos favoritos para mais tarde
          </p>
        </div>
      </div>

      {/* Lista de Favoritos */}
      <WishlistProducts />
    </Container>
  );
};

export default WishListPage;