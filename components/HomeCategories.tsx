import { Category } from "@/sanity.types";
import Container from "./Container";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  categories: Category[];
}

const HomeCategories = ({ categories }: Props) => {
  return (
    <Container className="mt-16 lg:mt-24">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-[#2d2a7d] to-[#e30613] rounded-full"></div>
          <Title className="text-3xl lg:text-4xl font-bold text-[#2d2a7d]">
            Categorias Populares
          </Title>
          <div className="h-1 w-12 bg-gradient-to-l from-[#2d2a7d] to-[#e30613] rounded-full"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore as nossas categorias de produtos mais populares e encontre o
          que precisa
        </p>
        <Link
          href={"/category"}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#2d2a7d]/10 text-[#2d2a7d] font-semibold rounded-full hover:bg-[#e30613] hover:text-white border-2 border-[#2d2a7d] hover:border-[#e30613] transition-all duration-300"
        >
          Navegue por Todas as Categorias
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Grid */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-[#2d2a7d]/5 p-8 lg:p-12 rounded-3xl shadow-xl border border-[#2d2a7d]/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category, index) => (
            <Link
              key={category?._id}
              href={`/category/${category?.slug?.current}`}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#2d2a7d] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Imagem */}
              <div className="flex justify-center mb-5">
                {category?.image && (
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 p-3 group-hover:shadow-lg transition-all">
                    <Image
                      src={urlFor(category?.image).url()}
                      alt={`${category?.title}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a7d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-bold text-[#2d2a7d] group-hover:text-[#e30613] transition-colors line-clamp-1">
                  {category?.title}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#e30613] rounded-full"></div>
                    <span className="text-sm font-semibold text-[#e30613]">
                      Explorar
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    esta categoria
                  </span>
                </div>

                {/* Barra decorativa */}
                <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-[#2d2a7d] to-[#e30613] h-2 rounded-full transition-all"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  ></div>
                </div>

                {/* Botão */}
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gray-50 text-[#2d2a7d] font-medium rounded-full group-hover:from-[#2d2a7d] group-hover:to-[#e30613] group-hover:bg-gradient-to-r group-hover:text-white text-sm transition-all">
                  Ver Produtos
                  <svg
                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-[#2d2a7d]/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2d2a7d]">
              {categories?.length}+
            </div>
            <div className="text-sm text-gray-600">Categorias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2d2a7d]">1000+</div>
            <div className="text-sm text-gray-600">Produtos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2d2a7d]">24/7</div>
            <div className="text-sm text-gray-600">Suporte</div>
          </div>
        </div>

        {/* CTA inferior */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#2d2a7d]/5 to-[#e30613]/5 rounded-2xl border border-[#2d2a7d]/20">
            <div className="w-2 h-2 bg-[#e30613] rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">
              Descubra produtos incríveis em todas as categorias.
            </span>
            <div className="w-2 h-2 bg-[#e30613] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeCategories;