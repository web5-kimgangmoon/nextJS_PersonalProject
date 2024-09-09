"use client";
import { ZodIssue } from "zod";

export default function ({
  error,
  reset,
}: {
  error:
    | (Error & { digest?: string })
    | (Error & {
        message: ZodIssue[];
        digest?: string;
      });
  reset: () => void;
}) {
  return (
    <div>
      {Array.isArray(error.message)
        ? error.message.map((item) => item.message)
        : error.message}
    </div>
  );
}
