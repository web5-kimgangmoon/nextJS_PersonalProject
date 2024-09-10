import { ReactNode } from "react";
import { Header } from "../ui/category/header";
import { Footer } from "../ui/category/footer";
import { SlideContextProvider } from "@/app/hooks/context/slideContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-categoryGray min-h-screen min-w-screen flex flex-col transition">
      <Header />
      <SlideContextProvider>
        <div className="grow">{children}</div>
      </SlideContextProvider>
      <Footer />
    </div>
  );
}
