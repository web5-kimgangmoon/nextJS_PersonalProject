"use client";

import { pageGetter } from "@/app/lib/utils";
import { LinkButton } from "../buttons";
import { countBoard as countBoardHolder } from "@/app/lib/placeholder-data";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { LeftArrow } from "@/public/left-arrow";
import { RightArrow } from "@/public/right-arrow";

export const Pages = () => {
  const countBoard = countBoardHolder;

  let path = usePathname() + "?";
  const query = useSearchParams();
  let page = query.get("page");
  if (page === null || Number.isNaN(+page)) {
    page = "1";
  }
  path += query.get("search") ? `search=${query.get("search")}&` : "";
  path += query.get("searchType")
    ? `searchType=${query.get("searchType")}&`
    : "";
  const info = pageGetter({ count: countBoard, target: +page, limit: 10 });
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
  return (
    <LinkButton
      color={isSelected ? "pink" : "none"}
      radius="full"
      size={"pageBtn"}
      href={`${link}`}
      icon={icon}
      isNoString={true}
      isImgBig={true}
      className="hover:text-[#D92643]"
    >
      {title}
    </LinkButton>
  );
};
