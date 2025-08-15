import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { DM_Serif_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themes";
import { CustomCursor } from "@/components/ui/cursor";
import { InteractiveGradient } from "@/components/ui/gradient";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/ui/loading";
import config from "@/lib/config.json";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"]
});

export const metadata: Metadata = {
  title: `${config.personal.name} | ${config.personal.title}`,
  description: config.personal.bio,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#000000",
  icons: { icon: "/DanielDAvatar.png", apple: "/DanielDAvatar.png" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/DanielDAvatar.png" />
        <link rel="apple-touch-icon" href="/DanielDAvatar.png" />
      </head>
      <body className={`${inter.variable} ${dmSerifDisplay.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false} 
          disableTransitionOnChange
          storageKey="theme"
        >
          <div className="relative">
            <LoadingScreen />
            <div className="relative">
              <InteractiveGradient />
              <CustomCursor />
              <main className="relative flex min-h-screen flex-col">
                {children}
              </main>
              <Toaster />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};
