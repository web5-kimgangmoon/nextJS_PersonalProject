import { ClockIcon } from "@heroicons/react/24/outline";

export const CreatedAt = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div>
          <ClockIcon className="w-6 h-6 text-fakeBlack" strokeWidth={2} />
        </div>
        <div className="text-sm text-textGray">
          2024년 8월 19일에 생성됐습니다.
        </div>
      </div>
    </div>
  );
};
