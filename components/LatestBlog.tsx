import Container from "./Container";
import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { Calendar, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

dayjs.locale("pt");

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

  return (
    <Container className="mt-16 lg:mt-24">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-[#2d2a7d] to-[#e30613] rounded-full"></div>
          <Title className="text-3xl lg:text-4xl font-bold text-[#2d2a7d]">
            Veja o Nosso Blog
          </Title>
          <div className="h-1 w-12 bg-gradient-to-l from-[#2d2a7d] to-[#e30613] rounded-full"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Fique informado das nossas próximas novidades
        </p>
        <Link
          href={"/blog"}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#2d2a7d]/10 text-[#2d2a7d] font-semibold rounded-full hover:bg-[#2d2a7d] hover:text-white border-2 border-[#2d2a7d] transition-all duration-300"
        >
          Ver Todos os Posts
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid de artigos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {blogs?.map((blog, index) => (
          <div
            key={blog?._id}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#2d2a7d] transition-all duration-300 transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Imagem */}
            {blog?.mainImage && (
              <div className="relative overflow-hidden">
                <Link href={`/blog/${blog?.slug?.current}`}>
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt={blog?.title || "Imagem do artigo"}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}

            {/* Conteúdo */}
            <div className="p-6">
              {/* Categorias */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {blog?.blogcategories?.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2d2a7d]/10 text-[#2d2a7d] border border-[#2d2a7d]/30"
                  >
                    {item?.title}
                  </span>
                ))}
              </div>

              {/* Data */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar size={16} className="text-[#e30613]" />
                <span>{dayjs(blog.publishedAt).format("D MMM, YYYY")}</span>
              </div>

              {/* Título */}
              <Link href={`/blog/${blog?.slug?.current}`} className="block">
                <h3 className="text-lg font-bold text-[#2d2a7d] line-clamp-2 group-hover:text-[#e30613] transition-colors duration-200 leading-tight">
                  {blog?.title}
                </h3>
              </Link>

              {/* Ações */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#e30613] hover:text-[#2d2a7d] transition-colors duration-200"
                >
                  Ler Mais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#25D366] hover:text-[#1da851] transition-colors"
                  aria-label="Falar no WhatsApp"
                >
                  <MessageCircle size={14} />
                  Pedir
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA inferior */}
      {blogs && blogs.length > 0 && (
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#2d2a7d]/5 to-[#e30613]/5 rounded-2xl border border-[#2d2a7d]/20">
            <div className="w-2 h-2 bg-[#e30613] rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">
              Descubra mais dicas e novidades no nosso blog
            </span>
            <div className="w-2 h-2 bg-[#e30613] rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default LatestBlog;