"use client";

import { motion } from "motion/react";
import {
  Users,
  Wrench,
  Award,
  Heart,
  Target,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  MessageCircle,
  Snowflake,
  Satellite,
  Sun,
  Building2,
} from "lucide-react";
import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => {
  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20E.D.S%20TECH.";

  // ===== ESTATÍSTICAS =====
  const stats = [
    { number: "500+", label: "Clientes Satisfeitos", icon: Users },
    { number: "9", label: "Áreas de Serviço", icon: Wrench },
    { number: "10+", label: "Anos de Experiência", icon: Award },
    { number: "99%", label: "Taxa de Satisfação", icon: Heart },
  ];

  // ===== SERVIÇOS =====
  const services = [
    { icon: Snowflake, title: "Refrigeração e Climatização" },
    { icon: Shield, title: "Segurança Eletrónica (CCTV)" },
    { icon: Zap, title: "Vedação Elétrica" },
    { icon: Satellite, title: "Internet Starlink" },
    { icon: Sun, title: "Energia Solar" },
    { icon: Wrench, title: "Instalações Elétricas" },
    { icon: Building2, title: "Facility Management" },
    { icon: CheckCircle, title: "Ferramentas Profissionais" },
  ];

  // ===== VALORES =====
  const values = [
    {
      icon: Target,
      title: "Foco no Cliente",
      description:
        "Cada decisão começa por entender as necessidades reais do cliente.",
      color: "text-[#e30613]",
    },
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description:
        "Todos os serviços com garantia, executados por técnicos certificados.",
      color: "text-[#2d2a7d]",
    },
    {
      icon: Zap,
      title: "Rapidez",
      description:
        "Resposta rápida e execução eficiente em todos os pedidos.",
      color: "text-[#fbbf24]",
    },
    {
      icon: Heart,
      title: "Confiança",
      description:
        "Relações de longo prazo construídas com transparência e honestidade.",
      color: "text-[#25D366]",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative py-20 bg-[#2d2a7d] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#e30613] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#fbbf24] rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Empresa Moçambicana
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Sobre a E.D.S TECH
            </h1>
            <div className="w-24 h-1 bg-[#e30613] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Engenharia, tecnologia e soluções inteligentes para a sua
              residência ou empresa. Qualidade, segurança e eficiência em cada
              serviço.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===== ESTATÍSTICAS ===== */}
      <section className="py-16 -mt-10">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#e30613]" />
                    <h3 className="text-3xl font-bold text-[#2d2a7d] mb-1">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== A NOSSA HISTÓRIA ===== */}
      <section className="py-20">
        <Container className="max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-[#e30613]/10 text-[#e30613] hover:bg-[#e30613]/20 border-0">
                A Nossa História
              </Badge>
              <h2 className="text-4xl font-bold text-[#2d2a7d] mb-6">
                Soluções Técnicas de Confiança em Moçambique
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A <strong>E.D.S TECH – Engenharia, Tecnologia e Soluções</strong>{" "}
                é uma empresa moçambicana especializada em serviços técnicos
                profissionais. Atuamos em <strong>Maputo e Matola</strong>{" "}
                oferecendo soluções completas em refrigeração, segurança
                eletrónica, energia e muito mais.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                A nossa missão é simples: <strong>proporcionar serviços de
                qualidade com rapidez, transparência e garantia</strong>,
                construindo relações de confiança com cada cliente.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#25D366] hover:bg-[#1da851] text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar Connosco
                  </Button>
                </a>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d] hover:text-white"
                  >
                    Ver Loja <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#2d2a7d] to-[#e30613] rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <MapPin className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Maputo & Matola</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Seg-Sex 7:30-17:30</p>
                  </div>
                </div>
                <blockquote className="text-lg italic">
                  &quot;Na E.D.S TECH, cada serviço é executado como se fosse
                  para a nossa própria casa.&quot;
                </blockquote>
                <p className="mt-4 font-semibold text-sm">
                  — Equipa E.D.S TECH
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== OS NOSSOS SERVIÇOS ===== */}
      <section className="py-20 bg-white">
        <Container className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#2d2a7d]/10 text-[#2d2a7d] hover:bg-[#2d2a7d]/20 border-0">
              O Que Fazemos
            </Badge>
            <h2 className="text-4xl font-bold text-[#2d2a7d] mb-4">
              Áreas de Atuação
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços técnicos com
              profissionais certificados.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all border-0 bg-gray-50 hover:bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-[#2d2a7d] rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#2d2a7d] text-sm leading-tight">
                        {service.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===== VALORES ===== */}
      <section className="py-20 bg-gray-50">
        <Container className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#e30613]/10 text-[#e30613] hover:bg-[#e30613]/20 border-0">
              Os Nossos Valores
            </Badge>
            <h2 className="text-4xl font-bold text-[#2d2a7d] mb-4">
              O Que Nos Guia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estes princípios estão presentes em todos os serviços que
              prestamos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all group cursor-pointer border-0 bg-white">
                    <CardContent className="p-6 text-center">
                      <Icon
                        className={`w-12 h-12 mx-auto mb-4 ${value.color} group-hover:scale-110 transition-transform`}
                      />
                      <h3 className="text-xl font-bold text-[#2d2a7d] mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===== PORQUÊ ESCOLHER-NOS ===== */}
      <section className="py-20 bg-white">
        <Container className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#fbbf24]/20 text-[#b45309] hover:bg-[#fbbf24]/30 border-0">
              Vantagens
            </Badge>
            <h2 className="text-4xl font-bold text-[#2d2a7d] mb-4">
              Porquê Escolher a E.D.S TECH?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Técnicos Certificados",
                description:
                  "Equipa especializada com formação profissional e anos de experiência.",
              },
              {
                icon: Zap,
                title: "Atendimento Rápido",
                description:
                  "Resposta rápida e intervenção em tempo recorde em Maputo e Matola.",
              },
              {
                icon: Star,
                title: "Garantia de Qualidade",
                description:
                  "Todos os serviços são executados com garantia e acompanhamento.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-[#2d2a7d]/10 hover:border-[#e30613]/30 transition-all">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2d2a7d] to-[#e30613] rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#2d2a7d] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-gradient-to-r from-[#2d2a7d] to-[#e30613] text-white">
        <Container className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">
              Precisa de um Serviço Técnico?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Fale connosco pelo WhatsApp e receba um orçamento grátis em
              minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Pedir Orçamento Grátis
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-[#2d2a7d] hover:bg-white/90"
                >
                  Outros Contactos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;