import Container from "@/components/Container";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SINGLE_BLOG_QUERYResult,
  OTHERS_BLOG_QUERYResult,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getOthersBlog,
  getSingleBlog,
} from "@/sanity/queries";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import {
  Calendar,
  ChevronLeft,
  User,
  Clock,
  Eye,
  Share2,
  BookOpen,
  ArrowRight,
  Heart,
  MessageCircle,
} from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

dayjs.locale("pt");

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = (await getSingleBlog(slug)) as SINGLE_BLOG_QUERYResult | null;
  if (!blog) return notFound();

  const calculateReadingTime = (body: unknown[]) => {
    if (!body) return 5;
    let wordCount = 0;
    body.forEach((block: unknown) => {
      if (typeof block === "object" && block !== null && "children" in block) {
        const blockObj = block as { _type?: string; children?: unknown[] };
        if (blockObj._type === "block" && blockObj.children) {
          blockObj.children.forEach((child: unknown) => {
            if (
              typeof child === "object" &&
              child !== null &&
              "text" in child
            ) {
              const childObj = child as { text?: string };
              if (childObj.text) {
                wordCount += childObj.text.split(" ").length;
              }
            }
          });
        }
      }
    });
    return Math.ceil(wordCount / 200);
  };

  const readingTime = calculateReadingTime(blog?.body || []);

  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    `Olá! Veja este artigo da E.D.S TECH: ${blog?.title}`
  )}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Container className="pt-6">
        <DynamicBreadcrumb
          customItems={[
            { label: "Blog", href: "/blog" },
            { label: blog?.title || "Artigo" },
          ]}
        />
      </Container>

      <Container className="py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <article className="space-y-8">
              {/* Cabeçalho */}
              <div className="space-y-6">
                {/* Categorias */}
                {blog?.blogcategories && blog.blogcategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.blogcategories.map(
                      (
                        category: { title: string | null; slug: string | null },
                        index: number
                      ) => (
                        <Badge
                          key={index}
                          className="bg-[#2d2a7d] hover:bg-[#e30613] text-white"
                        >
                          {category.title}
                        </Badge>
                      )
                    )}
                  </div>
                )}

                {/* Título */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d2a7d] leading-tight">
                  {blog?.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  {blog?.author?.name && (
                    <div className="flex items-center gap-2">
                      {blog?.author?.image && (
                        <Image
                          src={urlFor(blog.author.image)
                            .width(32)
                            .height(32)
                            .url()}
                          alt={blog.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span className="font-medium text-[#2d2a7d]">
                          {blog.author.name}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <time>
                      {dayjs(blog.publishedAt).format("D [de] MMMM [de] YYYY")}
                    </time>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{readingTime} min de leitura</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>2.5K visualizações</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d] hover:text-white"
                  >
                    <Heart size={16} className="mr-2" />
                    Gosto
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d] hover:text-white"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Comentar
                  </Button>
                  <a
                    href={whatsappShare}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                    >
                      <Share2 size={16} className="mr-2" />
                      Partilhar
                    </Button>
                  </a>
                </div>
              </div>

              {/* Imagem de capa */}
              {blog?.mainImage && (
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={urlFor(blog.mainImage).width(1200).height(600).url()}
                    alt={blog.title || "Imagem do artigo"}
                    width={1200}
                    height={600}
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              {/* Conteúdo */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 sm:p-12">
                  <div className="prose prose-lg max-w-none">
                    {blog.body && (
                      <PortableText
                        value={blog.body}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="my-6 text-base leading-relaxed text-gray-700 first:mt-0 last:mb-0">
                                {children}
                              </p>
                            ),
                            h2: ({ children }) => (
                              <h2 className="my-8 text-2xl sm:text-3xl font-bold text-[#2d2a7d] first:mt-0 last:mb-0">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="my-6 text-xl sm:text-2xl font-semibold text-[#2d2a7d] first:mt-0 last:mb-0">
                                {children}
                              </h3>
                            ),
                            h4: ({ children }) => (
                              <h4 className="my-4 text-lg font-semibold text-[#2d2a7d] first:mt-0 last:mb-0">
                                {children}
                              </h4>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="my-8 border-l-4 border-[#e30613] bg-gray-50 pl-6 py-4 text-base italic text-gray-700 first:mt-0 last:mb-0">
                                {children}
                              </blockquote>
                            ),
                          },
                          types: {
                            image: ({ value }) => (
                              <div className="my-8 overflow-hidden rounded-lg shadow-md">
                                <Image
                                  alt={value.alt || ""}
                                  src={urlFor(value).width(800).url()}
                                  className="w-full h-auto"
                                  width={800}
                                  height={600}
                                />
                              </div>
                            ),
                            separator: ({ value }) => {
                              switch (value.style) {
                                case "line":
                                  return (
                                    <hr className="my-8 border-t-2 border-[#2d2a7d]/20" />
                                  );
                                case "space":
                                  return <div className="my-8" />;
                                default:
                                  return null;
                              }
                            },
                          },
                          list: {
                            bullet: ({ children }) => (
                              <ul className="my-6 list-disc pl-6 space-y-2 text-gray-700">
                                {children}
                              </ul>
                            ),
                            number: ({ children }) => (
                              <ol className="my-6 list-decimal pl-6 space-y-2 text-gray-700">
                                {children}
                              </ol>
                            ),
                          },
                          listItem: {
                            bullet: ({ children }) => (
                              <li className="pl-2">{children}</li>
                            ),
                            number: ({ children }) => (
                              <li className="pl-2">{children}</li>
                            ),
                          },
                          marks: {
                            strong: ({ children }) => (
                              <strong className="font-semibold text-[#2d2a7d]">
                                {children}
                              </strong>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-50 px-2 py-1 rounded text-sm font-mono text-[#2d2a7d]">
                                {children}
                              </code>
                            ),
                            link: ({ value, children }) => (
                              <Link
                                href={value.href}
                                className="font-medium text-[#e30613] hover:text-[#2d2a7d] underline decoration-[#e30613] underline-offset-4 transition-colors"
                              >
                                {children}
                              </Link>
                            ),
                          },
                        }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Navegação */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-gray-200">
                <Button
                  asChild
                  variant="outline"
                  className="border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d] hover:text-white"
                >
                  <Link href="/blog" className="flex items-center gap-2">
                    <ChevronLeft size={16} />
                    Voltar ao Blog
                  </Link>
                </Button>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Partilhar este artigo:</span>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                      >
                        Facebook
                      </Button>
                    </a>
                    <a
                      href={whatsappShare}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                      >
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <BlogSidebar slug={slug} />
        </div>
      </Container>
    </div>
  );
};

const BlogSidebar = async ({ slug }: { slug: string }) => {
  const categories = await getBlogCategories();
  const blogs = await getOthersBlog(slug, 5);

  return (
    <div className="space-y-6">
      {/* Categorias */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#2d2a7d] flex items-center gap-2">
            <BookOpen size={18} />
            Categorias do Blog
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories?.map(({ blogcategories }, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <p className="text-gray-700 group-hover:text-[#2d2a7d] transition-colors">
                {blogcategories && blogcategories[0]?.title}
              </p>
              <Badge variant="secondary" className="text-xs bg-[#2d2a7d]/10 text-[#2d2a7d]">
                1
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Artigos Recentes */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#2d2a7d] flex items-center gap-2">
            <BookOpen size={18} />
            Artigos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {blogs?.map(
            (
              blogItem: OTHERS_BLOG_QUERYResult[0] & { publishedAt?: string },
              index: number
            ) => (
              <Link
                href={`/blog/${blogItem?.slug?.current}`}
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              >
                {blogItem?.mainImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={urlFor(blogItem.mainImage)
                        .width(80)
                        .height(80)
                        .url()}
                      alt="Miniatura"
                      width={80}
                      height={80}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200 group-hover:border-[#2d2a7d] transition-colors"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-[#2d2a7d] transition-colors">
                    {blogItem?.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar size={12} />
                    {dayjs(blogItem?.publishedAt).format("D MMM, YYYY")}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="flex-shrink-0 text-gray-400 group-hover:text-[#e30613] transition-colors"
                />
              </Link>
            )
          )}
        </CardContent>
      </Card>

     {/* CTA WhatsApp */}
<Card className="shadow-lg border-0 bg-gradient-to-br from-[#25D366] to-[#1da851] text-white">
  <CardContent className="p-6 text-center">
    <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
    <h3 className="text-lg font-bold text-white mb-2">
      Precisa de Ajuda Técnica?
    </h3>
    <p className="text-sm text-white/90 mb-4">
      Fale connosco pelo WhatsApp e receba um orçamento grátis.
    </p>
    <a
      href="https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Button
        className="w-full bg-white hover:bg-gray-100 text-[#1da851] font-bold"
        size="sm"
      >
        <MessageCircle size={16} className="mr-2" />
        Falar no WhatsApp
      </Button>
    </a>
  </CardContent>
</Card>
    </div>
  );
};

export default SingleBlogPage;