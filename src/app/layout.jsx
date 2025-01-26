import { Albert_Sans } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const albertSans = Albert_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "JayK - Real Estate",
  description: "Real estate website",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={albertSans.className}>
        <Header/>
          <div className="h-20"></div>
          {children}
        <Footer/>
        <Toaster/>
      </body>
    </html>
  );
}
