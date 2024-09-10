"use client";

import clsx from "clsx";
import { ChangeEvent, useCallback, useState } from "react";
import { LinkButton } from "../buttons";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export const SearchBox = () => {
  const base = usePathname();
  const query = useSearchParams();
  const options = [
    { title: "내용", value: "content" },
    { title: "제목", value: "title" },
    { title: "제목과 내용", value: "contentTitle" },
  ];
  const search = query.get("search");
  const searchType = query.get("searchType");
  const [searchState, setSearchState] = useState<{
    search: string;
    searchType: string | null;
  }>({
    search: search ? search : "",
    searchType: searchType ? searchType : "content",
  });
  const selectType = useCallback((value: string) => {
    setSearchState((item) => ({ ...item, sesearchType: value }));
  }, []);
  const inputSearch = useCallback((value: string) => {
    setSearchState((item) => ({ ...item, search: value }));
  }, []);
  return (
    <div className="py-4">
      <SearchTypeSelect
        options={options}
        selected="content"
        setOption={selectType}
        divClassName="pb-8"
        className="text-sm p-1 border border-borderGray outline-none bg-white"
      />
      <SearchBar
        value={searchState.search}
        onValue={(e: ChangeEvent<HTMLInputElement>) => {
          inputSearch(e.currentTarget.value);
        }}
      />
      <div className="py-2 flex">
        <LinkButton
          color="pink"
          href={
            searchState.searchType && searchState.search
              ? `${base}?search=${searchState.search}&searchType=${searchState.searchType}`
              : "/category"
          }
          radius="a little"
          className="grow"
        >
          검색
        </LinkButton>
      </div>
    </div>
  );
};
export const SearchTypeSelect = ({
  selected,
  options,
  setOption,
  divClassName,
  className,
}: {
  selected: string;
  options: { title: string; value: string; isUnselectable?: boolean }[];
  setOption: (value: string) => void;
  divClassName?: string;
  className?: string;
}) => {
  return (
    <div className={clsx("w-full h-full", divClassName)}>
      <select
        defaultValue={selected}
        className={clsx("w-full h-full", className)}
        onChange={(e) => setOption(e.currentTarget.value)}
      >
        {options.map((item, idx) => (
          <option disabled={item.isUnselectable} value={item.value} key={idx}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SearchBar = ({
  value,
  onValue,
}: {
  value: string;
  onValue: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative px-2">
      <label htmlFor="searchInput" className="absolute top-1 left-2 w-8 h-8">
        <Image
          src="/search.svg"
          className="w-full h-full"
          alt={"no image"}
          width={0}
          height={0}
        />
      </label>
      <input
        id="searchInput"
        placeholder="검색하고 싶은 내용을 입력해주세요"
        className="w-full border outline-none border-black text-sm py-2 pl-8"
        value={value}
        onChange={onValue}
      />
    </div>
  );
};
