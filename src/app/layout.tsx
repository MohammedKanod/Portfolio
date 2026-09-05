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
  title: "Mohammed Kanod — Builder, Cybersecurity & Technology",
  description:
    "Portfolio and experimental laboratory of Mohammed Kanod — Computer Science & Cybersecurity student, builder, and experimenter exploring the boundaries of systems, artificial intelligence, and physical mechanics.",
  keywords: [
    "Mohammed Kanod",
    "Cybersecurity",
    "Computer Science",
    "Artificial Intelligence",
    "Systems Architecture",
    "Physics Simulation",
    "Builder Portfolio",
    "Editorial Design",
  ],
  authors: [{ name: "Mohammed Kanod" }],
  creator: "Mohammed Kanod",
  openGraph: {
    type: "website",
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
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "iqZMjdw27E10wTRc2XELYBTOm2Z54-M0ETZ3UmGX_n8",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F4EF",
  width: "device-width",
  initialScale: 1,
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
      <body className="bg-canvas text-ink antialiased selection:bg-accent selection:text-white min-h-screen relative font-sans">
        {children}
      </body>
    </html>
  );
}
