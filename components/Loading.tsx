"use client";
import Logo from "./common/Logo";
import { motion } from "motion/react";
import { Wrench, Snowflake, Satellite, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Loading = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Preparando a sua experiência."
  );

  const loadingSteps = [
    {
      icon: Wrench,
      text: "Preparando os nossos serviços...",
      color: "text-[#2d2a7d]",
    },
    {
      icon: Snowflake,
      text: "A carregar soluções técnicas...",
      color: "text-[#e30613]",
    },
    {
      icon: Satellite,
      text: "A preparar tudo para si...",
      color: "text-[#fbbf24]",
    },
    {
      icon: CheckCircle,
      text: "Quase pronto!",
      color: "text-[#25D366]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[nextStep].text);
        return nextStep;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed min-h-screen w-full bg-[#f8f8fb] left-0 top-0 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center gap-8 max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo />
        </motion.div>

        <div className="flex space-x-3">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep
                  ? "bg-[#e30613] shadow-lg"
                  : index < currentStep
                  ? "bg-[#2d2a7d]"
                  : "bg-gray-300"
              }`}
              animate={{
                scale: index === currentStep ? [1, 1.3, 1] : 1,
                opacity: index <= currentStep ? 1 : 0.5,
              }}
              transition={{
                duration: 0.6,
                repeat: index === currentStep ? Infinity : 0,
                repeatDelay: 0.3,
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="p-4 rounded-full bg-white shadow-lg border-2 border-[#2d2a7d]/20">
              <CurrentIcon
                className={`w-8 h-8 ${loadingSteps[currentStep].color}`}
                strokeWidth={2}
              />
            </div>
          </motion.div>

          <motion.div
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            <h2 className="text-xl font-semibold text-[#2d2a7d]">
              {loadingText}
            </h2>
            <p className="text-sm text-gray-600">
              Por favor aguarde enquanto preparamos tudo para você
            </p>
          </motion.div>

          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2d2a7d] to-[#e30613] rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentStep + 1) / loadingSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          <motion.p
            className="text-sm font-medium text-[#2d2a7d]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(((currentStep + 1) / loadingSteps.length) * 100)}%
            Concluído
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Loading;