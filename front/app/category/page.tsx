import { BoardList, InformBoard } from "@/app/ui/category/board";
import { CategorySlideBar } from "@/app/ui/slideBar";

export default async function () {
  return (
    <div className="px-2">
      <InformBoard />
      <CategorySlideBar />
      <BoardList />
    </div>
  );
}
