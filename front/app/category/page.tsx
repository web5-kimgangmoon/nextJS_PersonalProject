import { BoardList, InformBoard } from "@/app/ui/category/board";
import { CategorySlideBar } from "@/app/ui/slideBar";
import { Pages } from "../ui/category/pageBtn";
import { SearchBox } from "../ui/category/searchBar";

export default async function Page() {
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
