import { ReactNode, Suspense } from "react";
import { LoadingSpin } from "../ui/loadingSpin";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Suspense fallback={<LoadingSpin bgColorClass="bg-white" />}>
        <div className="grow">{children}</div>
      </Suspense>
    </div>
  );
}
