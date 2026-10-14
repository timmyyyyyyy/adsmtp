"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim()) {
      setMessage({
        type: "error",
        text: "Digite o seu e-mail",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        text: "Por favor, introduza um e-mail válido",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text:
            data.message ||
            "Obrigado por subscrever! Verifique o seu e-mail para a mensagem de boas-vindas.",
        });
        setEmail("");
      } else {
        if (data.alreadySubscribed) {
          setMessage({
            type: "info",
            text:
              data.error ||
              "Já está subscrito à nossa newsletter! Verifique a sua caixa de entrada.",
          });
        } else {
          setMessage({
            type: "error",
            text: data.error || "Falha ao subscrever. Tente novamente.",
          });
        }
      }
    } catch (error) {
      console.error("Erro na subscrição da newsletter:", error);
      setMessage({
        type: "error",
        text: "Algo correu mal. Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Digite o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2.5 bg-white text-[#2d2a7d] placeholder-gray-400 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d2a7d] font-bold px-4 py-2.5 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              A subscrever...
            </>
          ) : (
            "Subscrever"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-300 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : message.type === "info"
              ? "bg-blue-100 text-blue-800 border border-blue-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.type === "success" && (
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          )}
          {message.type === "error" && (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          )}
          {message.type === "info" && (
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          )}
          <span className="flex-1">{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;