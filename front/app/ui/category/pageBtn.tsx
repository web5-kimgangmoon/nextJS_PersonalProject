"use client";

import { pageGetter } from "@/app/lib/utils";
import { Button, ImgButton, LinkButton } from "../buttons";
import {
  usePathname,
  useSearchParams,
  useParams,
  useRouter,
} from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";
import { LeftArrow } from "@/public/left-arrow";
import { RightArrow } from "@/public/right-arrow";
import clsx from "clsx";
import { useQuery_getBoardList } from "@/app/lib/data";
import { LoadingSpin } from "../loadingSpin";

export const Pages = () => {
  let path = usePathname() + "?";
  const query = useSearchParams();
  const params = useParams();
  let page = query.get("page");
  if (page === null || Number.isNaN(+page)) {
    page = "1";
  }
  path += query.get("search") ? `search=${query.get("search")}&` : "";
  path += query.get("searchType")
    ? `searchType=${query.get("searchType")}&`
    : "";
  const { isLoading, data, refetch } = useQuery_getBoardList({
    category: params["category"] ? (params["category"] as string) : "all",
    isDeleted: "false",
    isOwn: "false",
    limit: String(Number(page) * 10),
    offset: String((Number(page) - 1) * 10),
    search: query.get("search"),
    searchType: query.get("searchType"),
  });
  useEffect(() => {
    refetch();
  }, [page, query.get("search"), query.get("searchType"), refetch]);
  if (isLoading) return <LoadingSpin bgColorClass="bg-categoryGray" />;
  const info = pageGetter({
    count: data?.data.boardCnt,
    target: +page,
    limit: 10,
  });
  return (
    <div className="flex gap-2 justify-center py-4">
      {info?.pages.map((item, idx) => (
        <PageBtn
          key={item.title + "-" + idx}
          title={item.title}
          link={`${path}page=${item.page}`}
          icon={
            item.isLeft ? (
              <LeftArrow />
            ) : item.isRight ? (
              <RightArrow />
            ) : undefined
          }
          isSelected={+page === item.page}
        />
      ))}
    </div>
  );
};

export const PageBtn = ({
  title,
  link,
  icon,
  isSelected,
}: {
  title?: string;
  link: string;
  icon?: ReactNode;
  isSelected: boolean;
}) => {
  const router = useRouter();
  const searchOn = useCallback(() => {
    router.push(link);
  }, [link, router]);
  return !icon ? (
    <Button
      color={isSelected ? "pink" : "none"}
      radius="full"
      size={"pageBtn"}
      className={clsx(!isSelected && "hover:text-[#D92643]")}
      onClick={searchOn}
    >
      {title}
    </Button>
  ) : (
    <ImgButton
      color={isSelected ? "pink" : "none"}
      radius="full"
      size={"pageBtn"}
      icon={icon}
      isNoString={true}
      isImgBig={true}
      className={clsx(!isSelected && "hover:text-[#D92643]")}
      onClick={searchOn}
    >
      {title}
    </ImgButton>
  );
};
