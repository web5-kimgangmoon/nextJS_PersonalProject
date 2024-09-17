import { useQuery_getUserInfo } from "@/app/lib/data";
import { getTimeString, useTypeCheck_zod } from "@/app/lib/utils";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { LoadingSpin } from "../loadingSpin";

export const CreatedAt = () => {
  const params = useParams();
  const { intCheck } = useTypeCheck_zod();
  const userId = intCheck.safeParse(params.userId) ? +params.userId : undefined;
  const userInfo = useQuery_getUserInfo(userId ? userId : undefined);
  if (userInfo.isLoading) return <LoadingSpin bgColorClass="bg-white" />;
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div>
          <ClockIcon className="w-6 h-6 text-fakeBlack" strokeWidth={2} />
        </div>
        <div className="text-sm text-textGray">
          {userInfo.data?.data.userInfo
            ? getTimeString(userInfo.data.data.userInfo.createdAt, "userInfo")
            : "unknown data"}
        </div>
      </div>
    </div>
  );
};
