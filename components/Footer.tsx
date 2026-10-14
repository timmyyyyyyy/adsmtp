import Link from "next/link";
import Logo from "./common/Logo";
import { categoriesData, quickLinksData } from "@/constants";
import { contactConfig } from "@/config/contact";
import FooterTop from "./layout/FooterTop";
import SocialMedia from "./common/SocialMedia";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <footer className="bg-[#2d2a7d] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="mb-2">
              <Logo variant="sm" />
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {contactConfig.company.description}
            </p>
            <SocialMedia
              className="text-white/80"
              iconClassName="border-white/30 hover:border-[#fbbf24] hover:text-[#fbbf24]"
              tooltipClassName="bg-[#0f0f1a] text-white"
            />
          </div>

          <div>
            <h3 className="font-bold text-[#fbbf24] mb-4 uppercase tracking-wider text-sm">
              Acesso Rápido
            </h3>
            <ul className="space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-200 hover:text-[#fbbf24] text-sm font-medium transition-colors duration-200"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#fbbf24] mb-4 uppercase tracking-wider text-sm">
              Categorias
            </h3>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-gray-200 hover:text-[#fbbf24] text-sm font-medium transition-colors duration-200 capitalize"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#fbbf24] mb-4 uppercase tracking-wider text-sm">
              Envie-nos um E-mail
            </h3>
            <p className="text-gray-200 text-sm mb-4 leading-relaxed">
              Deixe-nos o seu e-mail para melhor interação
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="py-6 border-t border-white/20 text-center text-sm text-gray-200">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-black tracking-wider uppercase font-sans">
              E.D.S TECH
            </span>
            . Todos os Direitos Reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;