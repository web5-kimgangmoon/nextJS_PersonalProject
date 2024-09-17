import { BoardList, InformBoard } from "@/app/ui/category/board";
import { CategorySlideBar } from "@/app/ui/slideBar";
import { Pages } from "@/app/ui/category/pageBtn";
import { SearchBox } from "@/app/ui/category/searchBar";
import { categoryListData } from "@/app/lib/placeholder-data";

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
