import { Suspense } from "react";
import { Body } from "../../ui/write/body";

export default function Page() {
  return (
    <Suspense>
      <Body />
    </Suspense>
  );
}
