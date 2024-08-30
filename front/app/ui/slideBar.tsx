"use client";

import { categoryList as categoryListHolder } from "@/app/lib/placeholder-data";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TouchEvent, useCallback, useContext, useState } from "react";
import { SlideContext } from "./category/context/slideContext";
import type { setLocationTy } from "../lib/definitions";

export const CategorySlideBar = () => {
  const categoryList = categoryListHolder;
  const list = categoryList.map((item) => ({
    title: item.title,
    params: item.path,
  }));
  const { location, setLocation } = useContext(SlideContext);
  let params = useParams();
  params.category = params.category ? (params.category as string) : "all";
  return (
    <SlideBar
      list={list}
      location={location}
      setLocation={setLocation}
      selected={params.category}
      path="category"
    />
  );
};

export const SlideBar = ({
  path,
  list,
  location,
  selected,
  setLocation,
}: {
  path: string;
  list: { title: string; params: string }[];
  location: { current: number; dif: number; translate: number };
  selected: string;
  setLocation: (fn: setLocationTy) => void;
}) => {
  const touchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const parentWidth = e.currentTarget.parentElement?.clientWidth;
      const child = e.currentTarget.clientWidth;
      if (parentWidth) {
        setLocation((value) => ({
          ...value,
          current: e.targetTouches[0].clientX,
          dif: child - parentWidth,
        }));
      }
      e.currentTarget.style.translate = `${location.translate}px`;
    },
    [location.current, location.dif]
  );
  const touchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const move =
        e.targetTouches[0].clientX - location.current + location.translate;
      const distance = e.targetTouches[0].clientX - location.current;
      if (
        !(-move > location.dif && distance < 0) &&
        !(-move < 1 && distance > 0)
      )
        setLocation((value) => ({
          ...value,
          current: e.targetTouches[0].clientX,
          translate: move,
        }));
      e.currentTarget.style.translate = `${location.translate}px`;
    },
    [location.current, location.translate]
  );
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
            path={`/${path}/${item.params}`}
            selected={selected === item.params}
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
