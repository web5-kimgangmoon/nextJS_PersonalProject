import { BoardDetail } from "@/app/ui/category/[category]/[boardId]/boardDetail";
import { GiveScoreBox } from "@/app/ui/category/[category]/[boardId]/giveScoreBox";
import { BreadCrumble } from "@/app/ui/category/[category]/[boardId]/breadCrumble";
import { CommentTop } from "@/app/ui/category/[category]/[boardId]/cmtTop";
import { CmtList } from "@/app/ui/category/[category]/[boardId]/cmtList";
export default async function Page({}: {}) {
  return (
    <div className="px-2">
      <BreadCrumble />
      <BoardDetail />
      <GiveScoreBox />
      {/* <ReasonBox /> */}
      <CommentTop />
      <CmtList />
    </div>
  );
}
