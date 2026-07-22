import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Police utilisée dans toute la maquette
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Symphonia",
  description: "Gestion et partage de partitions pour ensembles musicaux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  );
}
