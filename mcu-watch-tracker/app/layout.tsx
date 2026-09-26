import type { Metadata, Viewport } from "next";
import { Assistant, Rubik } from "next/font/google";

import "./globals.css";

const display = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
});

const body = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "MCU Watch Tracker",
  title: {
    default: "MCU Watch Tracker — המסע שלך ב־MCU",
    template: "%s · MCU Watch Tracker",
  },
  description:
    "מעקב צפייה בסרטים ובסדרות של ה-MCU לפי ציר הזמן הכרונולוגי או סדר היציאה, כולל התקדמות, חיבורים בין הכותרים והגנה מפני ספוילרים.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MCU Tracker",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
