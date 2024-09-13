import { ReactNode, Suspense } from "react";
import { Header } from "../ui/category/header";
import { Footer } from "../ui/category/footer";
import { SlideContextProvider } from "@/app/hooks/context/slideContext";
import { LoadingSpin } from "../ui/loadingSpin";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-categoryGray min-h-screen min-w-screen flex flex-col transition">
      <Header />
      <SlideContextProvider>
        <Suspense fallback={<LoadingSpin bgColorClass="bg-categoryGray" />}>
          <div className="grow">{children}</div>
        </Suspense>
      </SlideContextProvider>
      <Footer />
    </div>
  );
}
