import { Header } from "@/app/ui/login/header";
import { Footer } from "@/app/ui/login/footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`bg-[url('/gradient-bg.png')] min-w-screen min-h-screen bg-cover`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
