import { BoardDetail } from "@/app/ui/category/[category]/[boardId]/boardDetail";
import { GiveScoreBox } from "@/app/ui/category/[category]/[boardId]/giveScoreBox";
import { ReasonBox } from "@/app/ui/reasonBox";
import { BreadCrumble } from "@/app/ui/category/breadCrumble";
import { CommentTop } from "@/app/ui/category/[category]/[boardId]/commentWrite";
import { WriteCmt } from "@/app/ui/category/[category]/[boardId]/commentBox";

export default async function () {
  return (
    <div className="px-2">
      <BreadCrumble />
      <BoardDetail />
      <GiveScoreBox />
      {/* <ReasonBox /> */}
      <CommentTop />
      <WriteCmt />
    </div>
  );
}
