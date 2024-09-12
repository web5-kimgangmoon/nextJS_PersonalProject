import { ReactNode } from "react";
import { Footer } from "../ui/user/footer";
import { Header } from "../ui/user/header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-userInfoGray min-w-screen min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
