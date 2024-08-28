"use client";

export default function ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <div>에러났어</div>;
}
