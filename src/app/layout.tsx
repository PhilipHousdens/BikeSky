
import "./globals.css";
import Header from "./compnents/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gradient-to-r from-black to-gradientEnd overflow-hidden">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
