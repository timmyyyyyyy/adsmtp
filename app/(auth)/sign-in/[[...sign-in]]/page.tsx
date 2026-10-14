"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { ArrowLeft, Shield, Lock, UserCheck } from "lucide-react";
import { contactConfig } from "@/config/contact";
import Container from "@/components/Container";
import { Suspense } from "react";

// ✅ Importa o Clerk apenas no cliente, sem SSR
const SignIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignIn),
  { ssr: false }
);

const SignInPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Acesso Seguro",
      description:
        "Os seus dados são protegidos com segurança de nível empresarial",
    },
    {
      icon: Lock,
      title: "Área Restrita",
      description: "Apenas administradores autorizados têm acesso",
    },
    {
      icon: UserCheck,
      title: "Gestão Total",
      description: "Gerir produtos, categorias e conteúdo do site",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-shop_light_green/5 via-shop_light_bg to-shop_light_pink/50 relative overflow-hidden">
      <Container>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(29,43,100,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(230,57,70,0.08)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(240,242,250,0.3)_0%,transparent_50%)]"></div>

        {/* Header */}
        <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-shop_dark_green hover:text-shop_light_green transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar à Home</span>
            </Link>
            <Logo />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
          {/* Left Side - Welcome Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
          >
            <div className="max-w-md mx-auto lg:max-w-lg lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shop_dark_green mb-4">
                  Área de Administração
                </h1>
                <p className="text-lg text-dark-text mb-8 leading-relaxed">
                  Inicie sessão para gerir o conteúdo de{" "}
                  {contactConfig.company.name}. Esta área é reservada à equipa
                  autorizada.
                </p>
              </motion.div>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-shop_light_green/10 rounded-lg flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-shop_light_green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-shop_dark_green mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-dark-text">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact Support */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-shop_light_green/20 shadow-sm"
              >
                <p className="text-sm text-dark-text">
                  Precisa de ajuda? Contacte-nos através de{" "}
                  <a
                    href={`mailto:${contactConfig.emails.support}`}
                    className="text-shop_light_green hover:text-shop_dark_green font-medium transition-colors duration-200"
                  >
                    {contactConfig.emails.support}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Sign In Form */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="w-full max-w-md">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 p-8">
                {/* Clerk Sign In Component */}
                <div className="clerk-sign-in">
                  <Suspense fallback={<div className="text-center py-8 text-gray-500">A carregar...</div>}>
                    <SignIn
                      signUpUrl="/sign-up"
                      forceRedirectUrl="/studio"
                      fallbackRedirectUrl="/studio"
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;