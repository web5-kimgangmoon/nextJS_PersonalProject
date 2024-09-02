import { BoardList, InformBoard } from "@/app/ui/category/board";
import { Pages } from "@/app/ui/category/pageBtn";
import { SearchBox } from "@/app/ui/category/searchBar";
import { CategorySlideBar } from "@/app/ui/slideBar";

export default function () {
  return (
    <div className="px-2">
      <InformBoard />
      <CategorySlideBar />
      <BoardList />
      <Pages />
      <SearchBox />
    </div>
  );
}
