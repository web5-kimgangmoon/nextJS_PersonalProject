import { BoardItem } from "@/app/ui/category/board";
import { categoryInformBoard as categoryInformBoardHolder } from "../lib/placeholder-data";

export default async function () {
  const categoryInformBoard = categoryInformBoardHolder;
  return (
    <div className="px-2">
      <BoardItem {...categoryInformBoard} />
    </div>
  );
}
