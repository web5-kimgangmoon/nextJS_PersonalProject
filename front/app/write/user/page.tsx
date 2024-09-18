import { Body } from "@/app/ui/write/user/body";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Body />
    </Suspense>
  );
}
