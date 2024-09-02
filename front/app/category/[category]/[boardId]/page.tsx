import { BoardDetail } from "@/app/ui/category/[category]/[boardId]/boardDetail";
import { GiveScoreBox } from "@/app/ui/category/[category]/[boardId]/giveScoreBox";
import { BreadCrumble } from "@/app/ui/category/breadCrumble";

export default async function () {
  return (
    <div className="px-2">
      <BreadCrumble />
      <BoardDetail />
      <GiveScoreBox />
    </div>
  );
}
