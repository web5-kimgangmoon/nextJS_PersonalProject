import { ReactNode } from "react";
import { Header } from "../ui/category/header";
import { Footer } from "../ui/category/footer";
import { Modal } from "../ui/modal";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="bg-categoryGray min-h-screen min-w-screen flex flex-col transition">
      <Header isLogin={false} />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
