import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "MCU Watch Tracker",
    short_name: "MCU Tracker",
    description:
      "מעקב צפייה בסרטי ה-MCU לפי ציר הזמן הכרונולוגי, כולל התקדמות והגנה מפני ספוילרים.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#07070a",
    orientation: "portrait-primary",
    lang: "he",
    dir: "rtl",
    categories: ["entertainment", "lifestyle"],
    icons: [
      {
        src: "/icons/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
