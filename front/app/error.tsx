"use client";

export default function ({
  error,
  reset,
}: {
  error: Error & { digest?: string };

  reset: () => void;
}) {
  return <div>{error.message}</div>;
}
