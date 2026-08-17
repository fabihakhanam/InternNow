import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { BookmarkProvider } from "@/components/BookmarkProvider";
import { SessionProvider } from "@/components/SessionProvider";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";

const display = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InternNow — Internships & volunteering for students, mapped by industry",
  description:
    "A free national directory of internships and volunteering opportunities for high school and college students. Explore by map and industry, get personalized recommendations, build your resume, and prep for interviews.",
  icons: { icon: "/icons/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#3a5ce8",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SessionProvider user={user}>
          <BookmarkProvider>
            <NavBar />
            {children}
            <Footer />
          </BookmarkProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
