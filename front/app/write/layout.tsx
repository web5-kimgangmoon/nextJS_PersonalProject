import { ReactNode } from "react";
import { Footer } from "../ui/write/footer";
import { Header } from "../ui/write/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
