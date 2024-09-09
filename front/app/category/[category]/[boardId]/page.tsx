import { BoardDetail } from "@/app/ui/category/[category]/[boardId]/boardDetail";
import { GiveScoreBox } from "@/app/ui/category/[category]/[boardId]/giveScoreBox";
import { BreadCrumble } from "@/app/ui/category/[category]/[boardId]/breadCrumble";
import { CommentTop } from "@/app/ui/category/[category]/[boardId]/cmtTop";
import { CmtList } from "@/app/ui/category/[category]/[boardId]/cmtList";
import { useTypeCheck_zod } from "@/app/lib/utils";

export default async function ({
  params,
}: {
  searchParams: {};
  params: { category: string; boardId: string };
}) {
  const { intCheck } = useTypeCheck_zod();
  const invalid = intCheck.safeParse(params.boardId);
  if (!invalid.success)
    return <div>{invalid.error.errors.map((item) => item.message)}</div>;
  const target = intCheck.parse(params.boardId);

  return (
    <div className="px-2">
      <BreadCrumble />
      <BoardDetail />
      <GiveScoreBox />
      {/* <ReasonBox /> */}
      <CommentTop />
      <CmtList boardId={target} />
    </div>
  );
}
