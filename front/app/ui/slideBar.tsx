"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TouchEvent, useContext } from "react";
import { SlideContext } from "../hooks/context/slideContext";
import { useSearchParams } from "next/navigation";
import { CategoryInfo, ILocation } from "@/app/lib/definitions";
import { useQuery_getCategories } from "../lib/data";
import { LoadingSpin } from "./loadingSpin";

export const CategorySlideBar = () => {
  const query = useSearchParams();
  const params = useParams();

  const search = query.get("search");
  const searchType = query.get("searchType");

  const categoryList = useQuery_getCategories();

  if (categoryList.isLoading)
    return <LoadingSpin bgColorClass="bg-categoryGray" />;
  const list = categoryList.data?.data.categories.map((item: CategoryInfo) => ({
    title: item.name,
    path: `/${"category"}/${item.path}${
      search && searchType ? `?search=${search}&searchType=${searchType}` : ""
    }`,
    selected: params.category === item.path ? true : false,
    id: item.id,
  }));
  return (
    <CategorySlideBarController
      list={[
        {
          path: `/category/all${
            search && searchType
              ? `?search=${search}&searchType=${searchType}`
              : ""
          }`,
          title: "전체",
          selected:
            list.filter(
              (item: { title: string; path: string; selected: boolean }) =>
                item.selected
            ).length === 0
              ? true
              : false,
        },
        ...list,
      ]}
    />
  );
};

export const CategorySlideBarController = ({
  list,
}: {
  list: { title: string; path: string; selected: boolean; id: number }[];
}) => {
  const { location, touchMove, touchStart } = useContext(SlideContext);
  return (
    <SlideBar
      list={list}
      touchMove={touchMove}
      touchStart={touchStart}
      location={location}
    />
  );
};

export const SlideBar = ({
  list,
  location,
  touchMove,
  touchStart,
  isUserInfo = false,
}: {
  list: { title: string; path: string; selected: boolean; id: number }[];

  location: ILocation;
  touchMove?: (e: TouchEvent<HTMLDivElement>) => void;
  touchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  isUserInfo?: boolean;
}) => {
  if (list.filter((item) => item.selected === true).length === 0)
    list[0].selected = true;
  return (
    <div
      className={clsx("relative w-full overflow-hidden", {
        "border-t border-b border-borderGray h-16": !isUserInfo,
        "h-8": isUserInfo,
      })}
    >
      <div
        className={clsx("absolute top-0 left-0 w-max h-full flex gap-2", {
          "py-2": !isUserInfo,
        })}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        style={{ translate: `${location.translate}px` }}
      >
        {list.map((item) =>
          isUserInfo ? (
            <Item_userInfo
              key={item.id}
              title={item.title}
              path={item.path}
              selected={item.selected}
            />
          ) : (
            <Item
              key={item.id}
              title={item.title}
              path={item.path}
              selected={item.selected}
            />
          )
        )}
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

export const Item_userInfo = ({
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
        selected
          ? "font-bold text-mainBlue border-t-4 border-mainBlue"
          : "text-textBlue"
      )}
    >
      <Link className="p-3" href={path}>
        {title}
      </Link>
    </div>
  );
};
