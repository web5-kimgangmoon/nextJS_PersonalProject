"use client";

import { useParams } from "next/navigation";

export default async function () {
  const params = useParams();
  return <div className="">{params.category}</div>;
}
