import clsx from "clsx";

export const Star = ({
  className,
  isFill,
  strokeWidth,
}: {
  className?: string;
  isFill?: boolean;
  strokeWidth?: number;
}) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill={isFill ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("w-full h-full", className)}
    strokeWidth={strokeWidth}
  >
    <g clipPath="url(#clip0_18_138)">
      <path
        d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_18_138">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
