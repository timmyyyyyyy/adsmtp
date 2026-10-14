"use client";

import { motion } from "motion/react";
import {
  MessageCircle,
  Phone,
  Clock,
  Snowflake,
  Shield,
  Zap,
  Satellite,
  Plug,
  Building2,
  Wrench,
  Sun,
  Wind,
  Mail,
} from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HelpPage = () => {
  const whatsappNumber = "258844974637";
  const whatsappBase = `https://wa.me/${whatsappNumber}`;

  const getWhatsApp = (message: string) =>
    `${whatsappBase}?text=${encodeURIComponent(message)}`;

  // ===== SERVIÇOS DA E.D.S TECH =====
  const services = [
    {
      title: "Refrigeração e Climatização",
      icon: Snowflake,
      description:
        "Instalação e manutenção de sistemas de refrigeração e climatização.",
      color: "from-blue-500 to-blue-700",
      message: "Olá! Gostaria de um orçamento para Refrigeração e Climatização.",
    },
    {
      title: "Ar-Condicionado",
      icon: Wind,
      description:
        "Venda, instalação e manutenção de ar-condicionado de todas as marcas.",
      color: "from-cyan-500 to-cyan-700",
      message: "Olá! Gostaria de um orçamento para Ar-Condicionado.",
    },
    {
      title: "Segurança Eletrónica",
      icon: Shield,
      description:
        "Câmaras de vigilância (CCTV), alarmes e controlo de acesso.",
      color: "from-red-500 to-red-700",
      message: "Olá! Gostaria de um orçamento para Segurança Eletrónica (CCTV).",
    },
    {
      title: "Vedação Elétrica",
      icon: Zap,
      description:
        "Soluções profissionais para proteção e vedação de instalações elétricas.",
      color: "from-yellow-500 to-orange-600",
      message: "Olá! Gostaria de um orçamento para Vedação Elétrica.",
    },
    {
      title: "Internet Starlink",
      icon: Satellite,
      description:
        "Instalação e configuração de internet via satélite Starlink.",
      color: "from-indigo-500 to-indigo-700",
      message: "Olá! Gostaria de um orçamento para Internet Starlink.",
    },
    {
      title: "Energia Solar",
      icon: Sun,
      description:
        "Sistemas solares fotovoltaicos para residências e empresas.",
      color: "from-amber-500 to-yellow-600",
      message: "Olá! Gostaria de um orçamento para Energia Solar.",
    },
    {
      title: "Instalações Elétricas",
      icon: Plug,
      description:
        "Projetos e execução de instalações elétricas residenciais e comerciais.",
      color: "from-orange-500 to-red-600",
      message: "Olá! Gostaria de um orçamento para Instalações Elétricas.",
    },
    {
      title: "Ferramentas",
      icon: Wrench,
      description:
        "Venda de ferramentas profissionais para todas as áreas técnicas.",
      color: "from-gray-500 to-gray-700",
      message: "Olá! Gostaria de saber mais sobre as Ferramentas disponíveis.",
    },
    {
      title: "Facility Management",
      icon: Building2,
      description:
        "Gestão integrada de serviços e manutenção de instalações.",
      color: "from-emerald-500 to-emerald-700",
      message: "Olá! Gostaria de um orçamento para Facility Management.",
    },
  ];

  // ===== QUICK ACTIONS =====
  const quickActions = [
    {
      title: "Pedir Orçamento",
      description: "Solicite um orçamento grátis para qualquer serviço",
      icon: MessageCircle,
      action: "Pedir via WhatsApp",
      href: getWhatsApp("Olá! Gostaria de pedir um orçamento."),
      color: "bg-[#25D366]",
      external: true,
    },
    {
      title: "Suporte Técnico",
      description: "Assistência técnica especializada para os seus equipamentos",
      icon: Phone,
      action: "Ligar Agora",
      href: "tel:+258844974637",
      color: "bg-[#e30613]",
      external: true,
    },
    {
      title: "Marcar Visita",
      description: "Agende uma visita técnica em Maputo ou Matola",
      icon: Clock,
      action: "Marcar via WhatsApp",
      href: getWhatsApp("Olá! Gostaria de agendar uma visita técnica."),
      color: "bg-[#2d2a7d]",
      external: true,
    },
  ];

  // ===== CANAIS DE CONTACTO =====
  const supportChannels = [
    {
      title: "WhatsApp",
      description: "Fale connosco diretamente pelo WhatsApp",
      icon: MessageCircle,
      availability: "Segunda a Sábado",
      response: "Resposta em minutos",
      action: "Falar no WhatsApp",
      color: "border-[#25D366] text-[#25D366] hover:bg-[#25D366]",
      href: getWhatsApp("Olá! Gostaria de mais informações."),
      external: true,
    },
    {
      title: "E-mail",
      description: "Envie-nos uma mensagem detalhada sobre o seu projeto.",
      icon: Mail,
      availability: "Sempre disponível",
      response: "Resposta em 2 horas",
      action: "Enviar E-mail",
      color: "border-[#e30613] text-[#e30613] hover:bg-[#e30613]",
      href: "mailto:edstechnology@tvcabo.co.mz",
      external: true,
    },
    {
      title: "Telefone",
      description: "Fale diretamente com um técnico especializado",
      icon: Phone,
      availability: "Seg-Sex 07:30-17:30",
      response: "Imediato",
      action: "Ligar Agora",
      color: "border-[#2d2a7d] text-[#2d2a7d] hover:bg-[#2d2a7d]",
      href: "tel:+258844974637",
      external: true,
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
              SERVIÇOS PROFISSIONAIS
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Nossos Serviços
            </h1>
            <div className="w-24 h-1 bg-[#e30613] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Soluções técnicas em refrigeração, segurança eletrónica, energia
              e muito mais. Peça já o seu orçamento grátis!
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <Container className="py-12 lg:py-16">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[#2d2a7d] mb-8 text-center">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <a
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 ${action.color} rounded-full mb-4`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#2d2a7d] mb-2">
                          {action.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {action.description}
                        </p>
                        <Button
                          variant="outline"
                          className="border-[#e30613] text-[#e30613] hover:bg-[#e30613] hover:text-white"
                        >
                          {action.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Serviços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[#2d2a7d] mb-8 text-center">
            Serviços que Oferecemos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                    <CardHeader>
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${service.color} rounded-lg mb-3`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-[#2d2a7d] text-lg">
                        {service.title}
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <a
                        href={getWhatsApp(service.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-semibold">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Pedir Orçamento
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Canais de Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[#2d2a7d] mb-8 text-center">
            Fale Connosco
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                    <CardHeader>
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4 mx-auto">
                        <Icon className="w-7 h-7 text-[#2d2a7d]" />
                      </div>
                      <CardTitle className="text-[#2d2a7d]">
                        {channel.title}
                      </CardTitle>
                      <CardDescription className="mb-4">
                        {channel.description}
                      </CardDescription>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {channel.availability}
                        </div>
                        <div className="text-sm text-gray-600">
                          {channel.response}
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          variant="outline"
                          className={`w-full ${channel.color} hover:text-white transition-all duration-200`}
                        >
                          {channel.action}
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-[#2d2a7d] to-[#e30613] text-white shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">
                Precisa de um Orçamento?
              </CardTitle>
              <CardDescription className="text-white/80">
                Fale connosco pelo WhatsApp e receba uma resposta em minutos
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <a
                href={getWhatsApp("Olá! Gostaria de pedir um orçamento.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-8 py-6 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Pedir Orçamento Grátis
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default HelpPage;