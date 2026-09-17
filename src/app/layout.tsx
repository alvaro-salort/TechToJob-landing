import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { getMessages } from "@/lib/messages";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const messages = getMessages();

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: messages.meta.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: messages.meta.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name }],
  generator: "Next.js",
  keywords: [
    "comunidad de desarrolladores",
    "empresas tech en español",
    "empleo tech junior",
    "programadores",
    "portfolio developer",
    "torneos de programacion",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    title: messages.meta.ogTitle,
    description: messages.meta.ogDescription,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechToJob - Comunidad de talento tech y empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@techtojob",
    creator: "@techtojob",
    title: messages.meta.ogTitle,
    description: messages.meta.ogDescription,
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/logos/SVG/simbolo-positivo.svg",
    shortcut: "/logos/SVG/simbolo-positivo.svg",
    apple: "/logos/SVG/simbolo-positivo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2f3436",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logos/SVG/v1Positivo.svg`,
    description: messages.meta.description,
    sameAs: [
      SITE_CONFIG.links.discord,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.x,
      SITE_CONFIG.links.instagram,
    ],
  };

  return (
    <html lang="es" className={sora.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
