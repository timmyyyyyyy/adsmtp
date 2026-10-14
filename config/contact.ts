// Contact configuration using environment variables

export const contactConfig = {
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || "E.D.S-Tech",
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "edstechnology@tvcabo.co.mz",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+ (258) 8412-12412",
    address:
      process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
      "123 Shopping Street, Commerce District",
    city: process.env.NEXT_PUBLIC_COMPANY_CITY || "Matola Av da liberdade nuemero 323",
    description:
      process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION ||
      "Discover amazing prodDescubra produtos incríveis na E.D.S-Tech, o seu destino de compras Atrasves do Whatsapp com confiança para artigos de qualidade e um atendimento ao cliente excepcional",
  },
  businessHours: {
    weekday:
      process.env.NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKDAY ||
      "Monday - Friday: 9AM - 6PM EST",
    weekend:
      process.env.NEXT_PUBLIC_COMPANY_BUSINESS_HOURS_WEEKEND ||
      "Saturday - Sunday: 10AM - 4PM EST",
  },
  emails: {
    support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@shopcart.com",
    sales: process.env.NEXT_PUBLIC_SALES_EMAIL || "sales@shopcart.com",
  },
  responseTime: {
    standard:
      process.env.NEXT_PUBLIC_CONTACT_RESPONSE_TIME ||
      "We reply within 24 hours",
    quick:
      process.env.NEXT_PUBLIC_QUICK_RESPONSE_TIME ||
      "2-4 hours during business hours",
  },
  socialMedia: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  },
  legal: {
    copyright:
      process.env.NEXT_PUBLIC_COPYRIGHT_TEXT ||
      "© 2024 ShopCart. All rights reserved.",
    privacyPolicy: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "/privacy",
    terms: process.env.NEXT_PUBLIC_TERMS_URL || "/terms",
  },
  support: {
    helpCenter: "/help",
    trackOrder: "/track-order",
    returns: "/returns",
    shipping: "/shipping",
    sizeGuide: "/size-guide",
  },
};

// Contact information for different sections
export const contactInfo = [
  {
    icon: "MapPin",
    title: "Visite nos",
    details: contactConfig.company.address,
    subDetails: contactConfig.company.city,
    color: "text-shop_dark_green",
    bgColor: "bg-shop_dark_green/10",
    href: `https://maps.google.com/?q=${encodeURIComponent(`${contactConfig.company.address}, ${contactConfig.company.city}`)}`,
  },
  {
    icon: "Phone",
    title: "Ligue nos",
    details: contactConfig.company.phone,
    subDetails: contactConfig.businessHours.weekday,
    color: "text-shop_light_green",
    bgColor: "bg-shop_light_green/10",
    href: `tel:${contactConfig.company.phone.replace(/\D/g, "")}`,
  },
  {
    icon: "Mail",
    title: "Email de Suporte",
    details: contactConfig.emails.support,
    subDetails: contactConfig.responseTime.standard,
    color: "text-shop_orange",
    bgColor: "bg-shop_orange/10",
    href: `mailto:${contactConfig.emails.support}`,
  },
  {
    icon: "Clock",
    title: "Business Hours",
    details: contactConfig.businessHours.weekday,
    subDetails: contactConfig.businessHours.weekend,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    href: null,
  },
];
