"use client";

import { categoryList as categoryListHolder } from "@/app/lib/placeholder-data";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { SlideContext } from "../hooks/context/slideContext";
import { useSearchParams } from "next/navigation";

export const CategorySlideBar = () => {
  const categoryList = categoryListHolder;
  const list = categoryList.map((item) => ({
    title: item.title,
    params: item.path,
  }));

  return (
    <SlideBar
      list={list}
      // location={location}
      // touchMove={touchMove as (e: TouchEvent<HTMLDivElement>) => void}
      // touchStart={touchStart as (e: TouchEvent<HTMLDivElement>) => void}
      // selected={params.category}
      path="category"
    />
  );
};

export const SlideBar = ({
  path,
  list,
}: // location,
// selected,
// touchStart,
// touchMove,
{
  path: string;
  list: { title: string; params: string }[];
  // location: { current: number; dif: number; translate: number };
  // selected: string;
  // touchStart: (e: TouchEvent<HTMLDivElement>) => void;
  // touchMove: (e: TouchEvent<HTMLDivElement>) => void;
}) => {
  const query = useSearchParams();
  const params = useParams();
  const search = query.get("search");
  const searchType = query.get("searchType");
  params.category = params.category ? (params.category as string) : "all";
  const { location, touchMove, touchStart } = useContext(SlideContext);
  return (
    <div className="relative w-full h-16 overflow-hidden border-t border-b border-borderGray">
      <div
        className="absolute top-0 left-0 py-2 w-max h-full flex gap-2"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        style={{ translate: `${location.translate}px` }}
      >
        {list.map((item, idx) => (
          <Item
            key={idx}
            title={item.title}
            path={`/${path}/${item.params}${
              search && searchType
                ? `?search=${search}&searchType=${searchType}`
                : ""
            }`}
            selected={params.category === item.params}
          />
        ))}
      </div>
    </div>
  );
};

export const Item = ({
  title,
  path,
  selected,
}: {
  title: string;
  path: string;
  selected: boolean;
}) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center",
        selected ? "font-bold text-mainBlue" : "text-textBlue"
      )}
    >
      <Link className="p-3" href={path}>
        {title}
      </Link>
    </div>
  );
};
