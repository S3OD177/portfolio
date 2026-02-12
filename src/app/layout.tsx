import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://saudalzaid.com"
  ),
  title: "Saud Albin Zaid | IT Specialist & CS Graduate",
  description:
    "Portfolio of Saud Albin Zaid - Computer Science graduate and IT Specialist with expertise in systems administration, network management, and cybersecurity.",
  keywords: [
    "Saud Albin Zaid",
    "IT Specialist",
    "Computer Science",
    "Portfolio",
    "Saudi Arabia",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Saud Albin Zaid | IT Specialist & CS Graduate",
    description:
      "Computer Science graduate and IT Specialist with expertise in systems administration, network management, and cybersecurity.",
    siteName: "Saud Albin Zaid Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saud Albin Zaid | IT Specialist & CS Graduate",
    description:
      "Computer Science graduate and IT Specialist with expertise in systems administration, network management, and cybersecurity.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Saud Albin Zaid",
  jobTitle: "IT Specialist",
  description:
    "Computer Science graduate and IT Specialist with expertise in systems administration, network management, and cybersecurity.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://saudalzaid.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
