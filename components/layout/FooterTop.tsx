import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactConfig } from "@/config/contact";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href?: string;
}

const data: ContactItemData[] = [
  {
    title: "Visite-nos",
    subtitle: `${contactConfig.company.address}, ${contactConfig.company.city}`,
    icon: (
      <MapPin className="h-6 w-6 text-[#fbbf24] group-hover:text-white transition-colors" />
    ),
    href: `https://maps.google.com/?q=${encodeURIComponent(`${contactConfig.company.address}, ${contactConfig.company.city}`)}`,
  },
  {
    title: "Ligue",
    subtitle: contactConfig.company.phone,
    icon: (
      <Phone className="h-6 w-6 text-[#fbbf24] group-hover:text-white transition-colors" />
    ),
    href: `tel:${contactConfig.company.phone.replace(/\D/g, "")}`,
  },
  {
    title: "Horário de Trabalho",
    subtitle: contactConfig.businessHours.weekday,
    icon: (
      <Clock className="h-6 w-6 text-[#fbbf24] group-hover:text-white transition-colors" />
    ),
  },
  {
    title: "Entre em Contacto",
    subtitle: contactConfig.emails.support,
    icon: (
      <Mail className="h-6 w-6 text-[#fbbf24] group-hover:text-white transition-colors" />
    ),
    href: `mailto:${contactConfig.emails.support}`,
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/20">
      {data.map((item, index) => (
        <ContactItem
          key={index}
          icon={item.icon}
          title={item.title}
          content={item.subtitle}
          href={item.href}
        />
      ))}
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}

const ContactItem = ({ icon, title, content, href }: ContactItemProps) => {
  const Component = href ? "a" : "div";
  const props = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : "_self",
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <Component
      {...props}
      className="flex items-center gap-3 group hover:bg-white/5 p-4 transition-colors cursor-pointer rounded-lg"
    >
      {icon}
      <div>
        <h3 className="font-semibold text-white group-hover:text-[#fbbf24] transition-colors">
          {title}
        </h3>
        <p className="text-gray-200 text-sm mt-1 group-hover:text-white transition-colors">
          {content}
        </p>
      </div>
    </Component>
  );
};

export default FooterTop;