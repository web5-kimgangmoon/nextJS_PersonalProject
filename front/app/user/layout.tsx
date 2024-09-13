import { ReactNode, Suspense } from "react";
import { Footer } from "../ui/user/footer";
import { Header } from "../ui/user/header";
import { LoadingSpin } from "../ui/loadingSpin";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-userInfoGray min-w-screen min-h-screen">
      <Suspense fallback={<LoadingSpin bgColorClass="bg-userInfoGray" />}>
        <Header />
        {children}
        <Footer />
      </Suspense>
    </div>
  );
}
