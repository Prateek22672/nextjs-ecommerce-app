import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer"; 

export const metadata = {
  title: "Minimal Store | Next.js E-Commerce",
  description: "A minimal e-commerce demo built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
