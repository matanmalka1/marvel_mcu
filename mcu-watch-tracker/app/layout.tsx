import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "MCU Watch Tracker",
  title: {
    default: "MCU Watch Tracker — המסע שלך ב־MCU",
    template: "%s · MCU Watch Tracker",
  },
  description:
    "מעקב צפייה בסרטי ה-MCU לפי ציר הזמן הכרונולוגי, כולל התקדמות, חיבורים בין הסרטים והגנה מפני ספוילרים.",
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
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
