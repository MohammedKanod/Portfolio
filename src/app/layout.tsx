import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kanod.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Mohammed Kanod — Builder, Cybersecurity & Technology",
    template: "%s | Mohammed Kanod",
  },
  description:
    "Portfolio and experimental laboratory of Mohammed Kanod — Computer Science & Cybersecurity student, builder, and experimenter exploring the boundaries of systems, artificial intelligence, and adversarial mechanics.",
  keywords: [
    "Mohammed Kanod",
    "Mohammed Kanod Portfolio",
    "Mohammed Kanod Cybersecurity",
    "Mohammed Kanod GitHub",
    "Mohammed Kanod LinkedIn",
    "Cybersecurity",
    "Computer Science",
    "Systems Architecture",
    "Kernel Systems",
    "Adversarial Systems",
    "Artificial Intelligence",
    "Physics Simulation",
    "Rust",
    "Python",
    "Builder Portfolio",
    "Editorial Design",
    "Technology Laboratory",
  ],
  authors: [{ name: "Mohammed Kanod", url: "https://kanod.dev" }],
  creator: "Mohammed Kanod",
  publisher: "Mohammed Kanod",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "profile",
    firstName: "Mohammed",
    lastName: "Kanod",
    username: "MohammedKanod",
    gender: "male",
    locale: "en_US",
    url: "https://kanod.dev",
    title: "Mohammed Kanod — Builder, Cybersecurity & Technology",
    description:
      "I don't just learn technology. I build things with it. Exploring the space between technology, science and unconventional ideas.",
    siteName: "Mohammed Kanod Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Kanod — Portfolio & Laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Kanod — Builder, Cybersecurity & Technology",
    description:
      "I don't just learn technology. I build things with it. Exploring the space between technology, science and ideas.",
    creator: "@kanod",
    images: ["/og-image.png"],
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
  verification: {
    google: "iqZMjdw27E10wTRc2XELYBTOm2Z54-M0ETZ3UmGX_n8",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F4EF",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kanod.dev/#person",
      "name": "Mohammed Kanod",
      "alternateName": ["Kanod", "MohammedKanod"],
      "url": "https://kanod.dev",
      "image": "https://kanod.dev/icon-512.png",
      "jobTitle": "Cybersecurity Researcher & Systems Builder",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Computer Science & Cybersecurity",
      },
      "sameAs": [
        "https://github.com/MohammedKanod",
        "https://www.linkedin.com/in/mohammed-kanod-a7ba9422a/",
      ],
      "knowsAbout": [
        "Cybersecurity",
        "Computer Science",
        "Systems Programming",
        "Linux Kernel",
        "Network Security",
        "Adversarial Systems",
        "Rust",
        "Python",
        "Artificial Intelligence",
      ],
      "description":
        "Mohammed Kanod is a Computer Science & Cybersecurity student, builder, and experimenter exploring autonomous software, operating system kernels, and adversarial security.",
    },
    {
      "@type": "WebSite",
      "@id": "https://kanod.dev/#website",
      "url": "https://kanod.dev",
      "name": "Mohammed Kanod — Portfolio & Laboratory",
      "description":
        "Portfolio and experimental laboratory of Mohammed Kanod — Computer Science & Cybersecurity student, builder, and experimenter.",
      "publisher": {
        "@id": "https://kanod.dev/#person",
        "@type": "Person",
        "name": "Mohammed Kanod",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kanod.dev/icon-512.png",
        },
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://kanod.dev/#profilepage",
      "url": "https://kanod.dev",
      "name": "Mohammed Kanod Profile",
      "mainEntity": {
        "@id": "https://kanod.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-canvas text-ink antialiased selection:bg-accent selection:text-white min-h-screen relative font-sans">
        {children}
      </body>
    </html>
  );
}
