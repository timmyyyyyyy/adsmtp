"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { contactConfig } from "@/config/contact";
import {
  CheckCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
  User,
  Pencil,
  List,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Snowflake,
  AirVent,
  Wrench,
  Cctv,
  Zap,
  Satellite,
  Plug,
  Settings,
  MoreHorizontal,
} from "lucide-react";

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  location: string;
  message: string;
}

const services = [
  { value: "refrigeracao", label: "Refrigeração e Climatização" },
  { value: "ar-condicionado", label: "Instalação de Ar-condicionado" },
  { value: "reparacao", label: "Reparação e Manutenção" },
  { value: "seguranca", label: "Segurança Eletrónica / CCTV" },
  { value: "vedacao", label: "Vedação Elétrica" },
  { value: "starlink", label: "Internet Starlink" },
  { value: "instalacoes", label: "Instalações Elétricas" },
  { value: "facility", label: "Facility Management" },
  { value: "outros", label: "Outros Serviços" },
];

const serviceIcons = [
  { icon: Snowflake, label: "Refrigeração e\nClimatização" },
  { icon: AirVent, label: "Instalação de\nAr-condicionado" },
  { icon: Wrench, label: "Reparação e\nManutenção" },
  { icon: Cctv, label: "Segurança\nEletrónica / CCTV" },
  { icon: Zap, label: "Vedação\nElétrica" },
  { icon: Satellite, label: "Internet\nStarlink" },
  { icon: Plug, label: "Instalações\nElétricas" },
  { icon: Settings, label: "Facility\nManagement" },
  { icon: MoreHorizontal, label: "Outros\nServiços" },
];

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          whatsapp: "",
          email: "",
          service: "",
          location: "",
          message: "",
        });
      } else {
        setError(data.error || "Algo correu mal. Tente novamente.");
      }
    } catch (err) {
      setError("Erro de rede. Verifique a sua conexão e tente novamente.");
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl =
    "https://wa.me/258844974637?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento.";

  return (
    <div className="bg-shop_light_bg min-h-screen">
      {/* ===== HERO ===== */}
      <section className="py-16 lg:py-20 bg-shop_dark_green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-shop_orange rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-shop_light_green rounded-full blur-3xl"></div>
        </div>
        <Container className="relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Fale connosco
          </h1>
          <div className="w-24 h-1 bg-shop_orange mx-auto mb-6 rounded-full"></div>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Estamos prontos para atender você! Preencha o formulário abaixo ou
            utilize os nossos canais de contacto direto.
          </p>
        </Container>
      </section>

      {/* ===== FORMULÁRIO + CONTACTOS RÁPIDOS ===== */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ---------- Formulário ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-shop_light_pink rounded-lg">
                <Pencil className="w-5 h-5 text-shop_dark_green" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-shop_dark_green">
                  Envie-nos uma mensagem
                </h2>
                <p className="text-sm text-light-color">
                  Preencha o formulário abaixo e entraremos em contacto
                  consigo.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome */}
              <div className="space-y-2">
                <Label className="text-shop_dark_green font-medium">
                  Nome completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    disabled={loading}
                    type="text"
                    name="name"
                    placeholder="Ex.: Carlos Nhamposse"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label className="text-shop_dark_green font-medium">
                  Número de WhatsApp *
                </Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    disabled={loading}
                    type="tel"
                    name="whatsapp"
                    placeholder="Ex.: +258 84 497 4637"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-shop_dark_green font-medium">
                  E-mail *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    disabled={loading}
                    type="email"
                    name="email"
                    placeholder="Ex.: seumail@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Serviço */}
              <div className="space-y-2">
                <Label className="text-shop_dark_green font-medium">
                  Serviço pretendido *
                </Label>
                <div className="relative">
                  <List className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <select
                    disabled={loading}
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full h-12 pl-10 pr-4 border border-input rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-shop_light_green/40 focus:border-shop_light_green"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Localização */}
              <div className="space-y-2">
                <Label className="text-shop_dark_green font-medium">
                  Localização
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    disabled={loading}
                    type="text"
                    name="location"
                    placeholder="Ex.: Matola, Maputo"
                    value={formData.location}
                    onChange={handleChange}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Mensagem */}
              <div className="space-y-2">
                <Label className="text-shop_dark_green font-medium">
                  Mensagem / Descrição do serviço *
                </Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea
                    disabled={loading}
                    name="message"
                    placeholder="Descreva o serviço que você precisa..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="pl-10 resize-none"
                  />
                </div>
              </div>

              {/* Erro */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botão */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-shop_orange hover:bg-shop_light_orange text-white h-12 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    A enviar...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    ENVIAR PEDIDO
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <span>🔒</span> Garantimos a segurança dos seus dados.
              </p>
            </form>
          </motion.div>

          {/* ---------- Contactos Rápidos ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-shop_dark_green">
                Contactos <span className="text-shop_orange">rápidos</span>
              </h2>
              <p className="text-sm text-light-color mt-1">
                Escolha o canal mais rápido para falar connosco.
              </p>
            </div>

            {/* WhatsApp */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 bg-green-500 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-700">WhatsApp</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Atendimento direto para orçamentos e informações.
                  </p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-700 mb-3">
                +258 84 497 4637
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm py-3 px-4 rounded-lg transition-colors w-full"
              >
                <MessageCircle className="w-4 h-4" />
                FALAR CONNOSCO PELO WHATSAPP
              </a>
            </div>

            {/* Email */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-700">E-mail</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    Envie-nos um e-mail e responderemos em breve.
                  </p>
                  <a
                    href="mailto:edstechnology@tvcabo.co.mz"
                    className="text-sm font-semibold text-blue-700 hover:underline"
                  >
                    edstechnology@tvcabo.co.mz
                  </a>
                </div>
              </div>
            </div>

            {/* Localização */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-shop_orange rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-shop_dark_green">
                    Localização
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Atendemos em <strong>Maputo e Matola</strong>
                    <br />
                    Moçambique
                  </p>
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 bg-shop_dark_green rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-shop_dark_green pt-2">
                  Horário de atendimento
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Segunda - Sexta</span>
                  <span className="font-semibold text-shop_dark_green">
                    07:30 - 17:30
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-semibold text-shop_dark_green">
                    08:00 - 13:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-semibold text-red-500">Fechado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------- Serviços ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-shop_dark_green">
              Nossos principais serviços
            </h2>
            <div className="w-24 h-1 bg-shop_orange mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {serviceIcons.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-shop_light_bg flex items-center justify-center group-hover:bg-shop_light_pink transition-colors">
                    <Icon className="w-7 h-7 text-shop_dark_green" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 whitespace-pre-line leading-tight">
                    {service.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>

      {/* ---------- Modal de Sucesso ---------- */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
            onClick={() => setSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-shop_dark_green mb-2">
                  Mensagem enviada com sucesso!
                </h3>
                <p className="text-dark-text mb-6">
                  Obrigado por entrar em contacto conosco. Recebemos a sua
                  mensagem e responderemos dentro de 24 horas.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="w-full bg-shop_dark_green hover:bg-shop_light_green text-white h-12 font-semibold rounded-lg transition-all duration-300"
                >
                  Fechar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;