"use client";

import { motion } from "framer-motion";
import {
  Snowflake,
  ShieldCheck,
  Zap,
  Wifi,
  Plug,
  Building2,
} from "lucide-react";

const features = [
  {
    icon: Snowflake,
    title: "Refrigeração e Climatização",
    description:
      "Instalação e manutenção de sistemas de ar condicionado e refrigeração.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    barColor: "from-blue-500 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Segurança Eletrónica",
    description:
      "Câmaras de vigilância, alarmes e controlo de acesso para sua proteção.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    barColor: "from-green-500 to-green-600",
  },
  {
    icon: Zap,
    title: "Vedação Elétrica",
    description:
      "Soluções profissionais para proteção e vedação de instalações elétricas.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    barColor: "from-purple-500 to-purple-600",
  },
  {
    icon: Wifi,
    title: "Internet Starlink",
    description:
      "Instalação e configuração de internet via satélite Starlink em qualquer lugar.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    barColor: "from-orange-500 to-orange-600",
  },
  {
    icon: Plug,
    title: "Instalações Elétricas",
    description:
      "Projetos e execução de instalações elétricas residenciais e comerciais.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    barColor: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Building2,
    title: "Facility Management",
    description:
      "Gestão integrada de serviços e manutenção de instalações.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    barColor: "from-indigo-500 to-indigo-600",
  },
];

export default function ShopFeatures() {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 my-16 lg:my-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-shop_light_blue to-shop_dark_blue rounded-full"></div>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-color">
            Nossos Serviços
          </h2>
          <div className="h-1 w-12 bg-gradient-to-l from-shop_light_blue to-shop_dark_blue rounded-full"></div>
        </div>
        <p className="text-light-color text-lg max-w-2xl mx-auto">
          Oferecemos soluções completas em refrigeração, segurança e
          instalações técnicas.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white via-shop_light_bg to-shop_light_pink p-8 lg:p-12 rounded-3xl shadow-xl border border-shop_light_blue/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-shop_light_blue transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-5">
                  <div
                    className={`relative w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:shadow-lg transition-all`}
                  >
                    <Icon
                      className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform`}
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-dark-color group-hover:text-shop_dark_blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-light-color leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`bg-gradient-to-r ${feature.barColor} h-1.5 rounded-full transition-all duration-500 group-hover:w-full`}
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}