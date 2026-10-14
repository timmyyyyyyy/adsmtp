import Container from "@/components/Container";
import Title from "@/components/Title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCategories } from "@/sanity/queries";
import { Category } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Tag } from "lucide-react";

const CategoryPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Início</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Categorias</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Título */}
        <div className="text-center mb-10">
          <Title className="text-3xl lg:text-4xl font-bold text-[#2d2a7d] mb-3">
            Compre por Categorias
          </Title>
          <div className="w-24 h-1 bg-[#e30613] mx-auto mb-6 rounded-full"></div>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Descubra a nossa vasta gama de produtos organizados por categorias.
            Encontre exatamente o que procura com facilidade.
          </p>

          <div className="flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Package className="w-5 h-5" />
              Ver Todos os Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {categories.length > 0 ? (
          <>
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug?.current}`}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#2d2a7d] transform hover:-translate-y-1"
                >
                  {/* Imagem */}
                  <div className="relative h-24 sm:h-28 lg:h-32 bg-gray-50 overflow-hidden">
                    {category.image ? (
                      <Image
                        src={urlFor(category.image).url()}
                        alt={category.title || "Categoria"}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 lg:w-10 lg:h-10 text-[#2d2a7d] opacity-40" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Badge em Destaque */}
                    {category.featured && (
                      <div className="absolute top-1.5 left-1.5 bg-[#e30613] text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                        <Tag className="w-2 h-2" />
                        <span className="hidden sm:inline text-xs">
                          Destaque
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-3 lg:p-4">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-sm lg:text-base font-semibold text-[#2d2a7d] group-hover:text-[#e30613] transition-colors duration-300 line-clamp-1">
                        {category.title}
                      </h3>
                      <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#e30613] group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0 ml-2" />
                    </div>

                    {category.description && (
                      <p className="text-gray-500 text-xs mb-2 line-clamp-1 lg:line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="capitalize truncate text-xs">
                        {category.slug?.current?.replace(/-/g, " ")}
                      </span>
                      {category.range && (
                        <span className="bg-[#2d2a7d]/10 text-[#2d2a7d] px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap ml-2">
                          {category.range}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Efeito hover */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2d2a7d] via-[#e30613] to-[#2d2a7d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA após categorias */}
            <div className="mt-10 text-center">
              <div className="bg-gradient-to-r from-[#2d2a7d]/5 via-[#e30613]/5 to-[#2d2a7d]/5 rounded-xl p-6 border border-[#2d2a7d]/20">
                <h3 className="text-lg lg:text-xl font-semibold text-[#2d2a7d] mb-2">
                  Explore a Nossa Gama Completa de Produtos
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Não encontrou o que procura? Navegue pela nossa coleção
                  completa de produtos.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Package className="w-4 h-4" />
                  Ver Todos os Produtos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 max-w-md mx-auto">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2d2a7d] mb-3">
                Nenhuma categoria disponível
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Parece que ainda não há categorias configuradas. Volte em breve
                para conferir as nossas categorias de produtos!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-300"
              >
                <Package className="w-4 h-4" />
                Encontre todos os produtos
              </Link>
            </div>
          </div>
        )}

        {/* Info adicional */}
        {categories.length > 0 && (
          <div className="mt-12 bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl lg:text-2xl font-bold text-[#2d2a7d] mb-3">
                Não Encontra o Que Procura?
              </h3>
              <p className="text-gray-600 mb-6 text-sm lg:text-base">
                Navegue por todos os nossos produtos ou fale connosco pelo
                WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-300"
                >
                  <Package className="w-4 h-4" />
                  Todos os Produtos
                </Link>
                <a
                  href="https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-300"
                >
                  <Tag className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;