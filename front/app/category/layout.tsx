import { ReactNode } from "react";
import { Header } from "../ui/category/header";
import { Footer } from "../ui/category/footer";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="bg-categoryGray min-h-screen min-w-screen flex flex-col transition">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
