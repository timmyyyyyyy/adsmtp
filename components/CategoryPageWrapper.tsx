"use client";

import { useState, useEffect } from "react";
import { Category, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  Tag,
  Grid3X3,
  Filter,
  TrendingUp,
} from "lucide-react";
import Title from "./Title";
import CategoryProducts from "./product/CategoryProducts";
import CategoryDetailSkeleton from "./CategoryDetailSkeleton";

interface Props {
  slug: string;
}

const CategoryPageWrapper = ({ slug }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategoryLoading(true);
        const categoriesQuery = `*[_type == "category"] {
          _id,
          title,
          slug,
          description,
          image,
          featured,
          range
        }`;
        const fetchedCategories = await client.fetch(categoriesQuery);
        setCategories(fetchedCategories);

        const current = fetchedCategories.find(
          (cat: Category) => cat.slug?.current === slug
        );
        setCurrentCategory(current || null);

        const productsQuery = `
          *[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)] {
            ...,
            brand->{
              _id,
              title
            }
          }
        `;
        const fetchedProducts: Product[] = await client.fetch(productsQuery, {
          slug,
        });
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
        setError("Falha ao carregar os dados da categoria");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Skeleton enquanto carrega
  if (categoryLoading) {
    return <CategoryDetailSkeleton />;
  }

  // Estado de erro
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg">
        <Package className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Erro ao Carregar Categoria
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link
          href="/category"
          className="inline-flex items-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar às Categorias
        </Link>
      </div>
    );
  }

  const categoryTitle = currentCategory?.title || slug;
  const relatedCategories = categories
    .filter((cat) => cat.slug?.current !== slug)
    .slice(0, 6);

  return (
    <>
      {/* Cabeçalho da Categoria */}
      <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              {currentCategory?.image && (
                <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(currentCategory.image).url()}
                    alt={categoryTitle}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex-1">
                <Title className="text-2xl lg:text-3xl font-bold text-[#2d2a7d] mb-2">
                  {categoryTitle}
                </Title>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {currentCategory?.featured && (
                    <div className="flex items-center gap-1 text-[#e30613]">
                      <Tag className="w-4 h-4" />
                      <span>Categoria em Destaque</span>
                    </div>
                  )}
                  {currentCategory?.range && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Intervalo: {currentCategory.range}</span>
                    </div>
                  )}
                </div>

                {currentCategory?.description && (
                  <p className="text-gray-600 text-sm lg:text-base line-clamp-2">
                    {currentCategory.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/category"
                className="inline-flex items-center gap-2 text-[#2d2a7d] hover:text-[#e30613] transition-colors duration-300 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar às Categorias
              </Link>

              <div className="h-4 w-px bg-gray-300" />

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Package className="w-4 h-4" />
                Ver Todos os Produtos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                <Grid3X3 className="w-3 h-3" />
                <span>Vista de Categoria</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                <Filter className="w-3 h-3" />
                <span>Resultados Filtrados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <CategoryProducts
        categories={categories}
        slug={slug}
        initialProducts={products}
      />

      {/* Categorias Relacionadas */}
      {relatedCategories.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-[#2d2a7d]">
              Explore Outras Categorias
            </h3>
            <Link
              href="/category"
              className="text-[#e30613] hover:text-[#2d2a7d] font-medium text-sm flex items-center gap-1 transition-colors duration-300"
            >
              Ver Todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedCategories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug?.current}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#2d2a7d] p-4 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-50 rounded-lg flex items-center justify-center">
                  {category.image ? (
                    <Image
                      src={urlFor(category.image).url()}
                      alt={category.title || "Categoria"}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <Package className="w-6 h-6 text-[#2d2a7d] opacity-60" />
                  )}
                </div>

                <h4 className="text-sm font-medium text-[#2d2a7d] group-hover:text-[#e30613] transition-colors duration-300 line-clamp-1">
                  {category.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Final */}
      <div className="mt-12 bg-gradient-to-r from-[#2d2a7d]/5 via-[#e30613]/5 to-[#2d2a7d]/5 rounded-xl p-6 lg:p-8 border border-[#2d2a7d]/20 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl lg:text-2xl font-bold text-[#2d2a7d] mb-3">
            Descubra Mais Produtos Incríveis
          </h3>
          <p className="text-gray-600 mb-6 text-sm lg:text-base">
            Não encontrou o que procura em <strong>{categoryTitle}</strong>?
            Explore a nossa coleção completa de produtos em todas as categorias.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#2d2a7d] hover:bg-[#e30613] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Package className="w-5 h-5" />
              Ver Todos os Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/category"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              <Grid3X3 className="w-5 h-5" />
              Todas as Categorias
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPageWrapper;