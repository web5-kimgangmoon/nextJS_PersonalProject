"use client";

import { usePathname } from "next/navigation";

export default async function () {
  const path = usePathname();
  return <div className="">{path}</div>;
}
