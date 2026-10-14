import Container from "@/components/Container";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GET_ALL_BLOGResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import {
  Calendar,
  Clock,
  ArrowRight,
  User,
  Eye,
  BookOpen,
  Wrench,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

dayjs.locale("pt");

const BlogPage = async () => {
  const blogs = await getAllBlogs(12);

  const calculateReadingTime = (title: string) => {
    const wordsPerMinute = 200;
    const wordCount = title.split(" ").length * 20;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const extractDescription = (
    body: GET_ALL_BLOGResult[0]["body"],
    maxLength: number = 150
  ) => {
    if (!body || !Array.isArray(body))
      return "Descubra dicas, novidades e soluções técnicas da E.D.S TECH.";

    let description = "";
    for (const block of body) {
      if (block._type === "block" && block.children) {
        for (const child of block.children) {
          if (child.text && child._type === "span") {
            description += child.text + " ";
            if (description.length > maxLength) {
              return description.substring(0, maxLength).trim() + "...";
            }
          }
        }
      }
    }

    return (
      description.trim() ||
      "Leia os nossos artigos mais recentes e descubra novas soluções."
    );
  };

  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento.";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Container className="pt-6">
        <DynamicBreadcrumb />
      </Container>

      {/* ===== HERO ===== */}
      <Container className="py-8 sm:py-12">
        <Card className="bg-[#2d2a7d] text-white border-0 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#e30613] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#fbbf24] rounded-full blur-3xl"></div>
          </div>
          <CardContent className="relative z-10 p-6 sm:p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  Blog E.D.S TECH
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Dicas, Tutoriais & Novidades
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Descubra dicas técnicas, novidades do setor e soluções
                inteligentes para a sua casa ou empresa. Fique por dentro de
                tudo com a E.D.S TECH.
              </p>

              {/* Estatísticas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-white/80 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Artigos</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold">
                    {blogs?.length || 0}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-white/80 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Leitores</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold">5K+</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-white/80 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Autores</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold">3+</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>

      {/* ===== GRELHA DE ARTIGOS ===== */}
      <Container className="py-8 sm:py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2d2a7d] mb-2">
                Artigos Recentes
              </h2>
              <p className="text-gray-600">
                Fique atualizado com as nossas últimas publicações
              </p>
            </div>
          </div>
        </div>

        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <Card
                key={blog?._id}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-lg bg-white ${
                  index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {blog?.mainImage && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={urlFor(blog.mainImage).url()}
                      alt={blog?.title || "Imagem do artigo"}
                      width={500}
                      height={300}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        index === 0 ? "h-64 md:h-80" : "h-48 md:h-56"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Link
                      href={`/blog/${blog?.slug?.current}`}
                      className="absolute inset-0"
                    />

                    {/* Badge de categoria */}
                    {blog?.blogcategories && blog.blogcategories.length > 0 && (
                      <Badge className="absolute top-4 left-4 bg-[#e30613] hover:bg-[#c00510] text-white">
                        {blog.blogcategories[0]?.title}
                      </Badge>
                    )}
                  </div>
                )}

                <CardContent className="p-4 sm:p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {dayjs(blog.publishedAt).format("D MMM, YYYY")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {calculateReadingTime(blog?.title || "")} min
                    </div>
                  </div>

                  {/* Título */}
                  <Link
                    href={`/blog/${blog?.slug?.current}`}
                    className="block group/title"
                  >
                    <h3
                      className={`font-bold text-[#2d2a7d] group-hover/title:text-[#e30613] transition-colors duration-200 line-clamp-2 leading-tight ${
                        index === 0
                          ? "text-lg sm:text-xl md:text-2xl mb-3"
                          : "text-base sm:text-lg mb-2"
                      }`}
                    >
                      {blog?.title}
                    </h3>
                  </Link>

                  {/* Descrição */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {extractDescription(blog?.body || [])}
                  </p>

                  <Separator className="my-3" />

                  {/* Ações */}
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/blog/${blog?.slug?.current}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#e30613] hover:text-[#2d2a7d] transition-colors duration-200 group/link"
                    >
                      Ler Mais
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#25D366] hover:text-[#1da851] transition-colors"
                    >
                      <MessageCircle size={14} />
                      Pedir
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 sm:p-12 text-center bg-white">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Ainda Sem Artigos
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Estamos a preparar conteúdos incríveis. Volte em breve!
                </p>
                <Button asChild className="bg-[#2d2a7d] hover:bg-[#e30613]">
                  <Link href="/">Voltar à Home</Link>
                </Button>
              </div>
            </div>
          </Card>
        )}
      </Container>

      {/* ===== CTA FINAL ===== */}
      <Container className="py-8 sm:py-12">
        <Card className="bg-gradient-to-r from-[#2d2a7d] to-[#e30613] text-white border-0">
          <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <Wrench className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                Precisa de um Serviço Técnico?
              </h2>
              <p className="text-sm sm:text-base text-white/90 mb-6">
                Conte com a E.D.S TECH para refrigeração, segurança eletrónica,
                energia solar e muito mais. Peça já o seu orçamento grátis!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="bg-[#25D366] hover:bg-[#1da851] text-white w-full sm:w-auto font-bold"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Pedir Orçamento Grátis
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-[#2d2a7d] w-full sm:w-auto"
                >
                  <Link href="/help">Ver Serviços</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default BlogPage;