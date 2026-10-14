import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Script from "next/script";
import Head from "next/head";
import "./globals.css";

const poppins = localFont({
  src: "./fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false,
});
const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

const opensans = localFont({
  src: "./fonts/Open Sans.woff2",
  variable: "--font-open-sans",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edstech.co.mz"),
  title: {
    template: "%s | E.D.S TECHNOLOGY LDA",
    default: "E.D.S TECHNOLOGY LDA - Engenharia, Tecnologia e Soluções",
  },
  description:
    "Soluções inteligentes em engenharia, tecnologia e serviços. Qualidade, segurança e eficiência para sua residência ou empresa.",
  keywords: [
    "E.D.S Technology",
    "engenharia",
    "tecnologia",
    "refrigeração",
    "climatização",
    "segurança eletrónica",
    "vedação elétrica",
    "Starlink",
    "instalações elétricas",
    "facility management",
    "Moçambique",
    "Maputo",
    "Matola",
  ],
  authors: [{ name: "E.D.S Technology LDA" }],
  creator: "E.D.S Technology LDA",
  publisher: "E.D.S Technology LDA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: "https://edstech.co.mz",
    siteName: "E.D.S Technology LDA",
    title: "E.D.S TECHNOLOGY LDA - Engenharia, Tecnologia e Soluções",
    description:
      "Soluções inteligentes em engenharia, tecnologia e serviços. Qualidade, segurança e eficiência para sua residência ou empresa.",
    images: [
      {
        url: "/log.png",
        width: 1200,
        height: 630,
        alt: "E.D.S Technology LDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E.D.S TECHNOLOGY LDA - Engenharia, Tecnologia e Soluções",
    description:
      "Soluções inteligentes em engenharia, tecnologia e serviços em Moçambique.",
    images: ["/log.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://edstech.co.mz",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const GADSENSE_CLIENT_ID = "ca-pub-6542623777003381";
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/studio"
      signUpFallbackRedirectUrl="/studio"
    >
      <html lang="pt">
        <Head>
          <meta name="google-adsense-account" content={GADSENSE_CLIENT_ID} />
        </Head>
        <body
          className={`${poppins.variable} ${raleway.variable} ${opensans.variable} antialiased`}
        >
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f2937",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              },
              className: "sonner-toast",
            }}
          />
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GADSENSE_CLIENT_ID}`}
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;