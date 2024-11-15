import "./globals.css";
import Header from "./compnents/Header";

export const metadata = {
  title: "Biker Sky",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gradient-to-r from-black to-gradientEnd overflow-hidden">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
