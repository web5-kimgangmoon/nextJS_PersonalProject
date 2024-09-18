"use client";

import { pushedFormData, useTypeCheck_zod } from "@/app/lib/utils";
import { Button } from "@/app/ui/buttons";
import { InputBox_plain } from "@/app/ui/inputBox";
import {
  useQuery_getBoardDetail,
  useQuery_getCategories,
  useQuery_getCategoryDetail,
  useQuery_getOwnInfo,
} from "@/app/lib/data";
import { Modal_little } from "@/app/ui/modal";
import { LoadingSpin } from "@/app/ui/loadingSpin";
import { useModalText } from "@/app/hooks/modal";
import { useFormDataImg } from "@/app/hooks/formDataImg";
import { usePreview } from "@/app/hooks/preview";
import { useCallback, useEffect, useMemo } from "react";
import {
  useBoardAdd,
  useBoardRemake,
  useProfileUpdate,
} from "@/app/lib/actions";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useSimpleText } from "@/app/hooks/simpleText";

export const Body = () => {
  const userInfo = useQuery_getOwnInfo();
  const categoryInfo = useQuery_getCategories();
  const query = useSearchParams();
  const params = useParams();
  const { intCheck } = useTypeCheck_zod();

  const category = query.get("category");
  const boardId = intCheck.safeParse(params.boardId)
    ? +params.boardId
    : undefined;
  if (userInfo.isLoading || categoryInfo.isLoading)
    return <LoadingSpin bgColorClass="bg-white" />;
  const select = categoryInfo.data?.data?.categories
    ?.slice(1)
    ?.find((item: { path: string }) => item.path === category);
  if (!userInfo.data?.data?.userInfo?.id)
    return <Redirect reason="유저정보가 존재하지 않습니다." />;
  if (!boardId && !select)
    return <Redirect reason="존재하지 않는 카테고리입니다." />;
  return (
    <>
      {boardId ? (
        <Box_board
          userId={userInfo.data?.data?.userInfo?.id}
          boardId={boardId}
        />
      ) : (
        <Box_category category={category as string} />
      )}
    </>
  );
};

const Redirect = ({ reason }: { reason: string }) => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/category/all");
  }, []);
  return (
    <Modal_little modalCtl={true} closeModalCtl={() => {}}>
      {reason}
    </Modal_little>
  );
};

const Box_board = ({
  userId,
  boardId,
}: {
  userId: number;
  boardId: number;
}) => {
  const boardDetail = useQuery_getBoardDetail(boardId);
  if (boardDetail.isLoading) return <LoadingSpin bgColorClass="bg-white" />;
  const data = boardDetail.data?.data;
  if (!data.id) return <Redirect reason="존재하지 않는 게시글입니다" />;
  return (
    <Box_board_compare
      userId={userId}
      writerId={data.writerId}
      title={data.title}
      description={data.description}
      img={data.img}
      content={data.content}
      category={data.categoryPath}
      boardId={boardId}
    />
  );
};
const Box_board_compare = ({
  userId,
  writerId,
  title,
  content,
  description,
  img,
  category,
  boardId,
}: {
  userId: number;
  writerId: number;
  title: string;
  content: string;
  description: string;
  img: string;
  category: string;
  boardId: number;
}) => {
  const categoryDetail = useQuery_getCategoryDetail({ search: { category } });
  if (writerId !== userId) <Redirect reason="작성자가 아닙니다" />;
  if (categoryDetail.isLoading) return <LoadingSpin bgColorClass="bg-white" />;
  if (
    !categoryDetail.data?.data?.path ||
    categoryDetail.data?.data?.path === "all"
  )
    return <Redirect reason="존재하지 않는 카테고리입니다" />;
  if (categoryDetail.data?.data?.path === "inform")
    return <Redirect reason="공지는 현 사이트에서 작성할 수 없습니다" />;
  const data = categoryDetail?.data?.data;
  return (
    <WriteContainer
      data={data}
      boardInfo={{ content, title, description, img, id: boardId }}
    />
  );
};

const Box_category = ({ category }: { category: string }) => {
  const categoryDetail = useQuery_getCategoryDetail({ search: { category } });
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["get", "category"] });
  }, [category]);
  if (categoryDetail.isLoading) return <LoadingSpin bgColorClass="bg-white" />;
  const data = categoryDetail.data?.data;
  return <WriteContainer data={data} />;
};

const WriteContainer = ({
  data,
  boardInfo,
}: {
  data: {
    img: string;
    name: string;
    rules: string[];
    titlePlaceholder: string;
    contentPlaceholder: string;
    descriptionPlaceholder: string;
    path: string;
  };
  boardInfo?: {
    title: string;
    content: string;
    img: string;
    id: number;
    description: string;
  };
}) => {
  return (
    <div>
      <div className="w-full h-20 relative">
        <Image
          src={data.img}
          width={20}
          height={20}
          alt="no image"
          className="w-full h-full "
        />
        <div className="w-full h-full absolute top-0 left-0 bg-mainBlue/40 p-4 text-xl text-white">
          <div>The board</div>
          <div className="font-bold">{data.name}</div>
        </div>
      </div>
      <div className="px-2 bg-borderGray">
        <div className="">
          <div className="py-4">
            <div className="p-4 border-b border-t border-borderGray text-white bg-mainBlue">
              <div className="font-bold">글쓰기 전에</div>
              <div className="text-sm px-2">
                <ul className="px-2 list-disc">
                  <ul className="px-2 list-disc">
                    {data.rules.map((item: any, idx: number) => (
                      <li key={idx} className="py-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </ul>
              </div>
            </div>
          </div>
          <WriteBox
            titlePlaceholder={data.titlePlaceholder}
            contentPlaceholder={data.contentPlaceholder}
            descriptionPlaceholder={data.descriptionPlaceholder}
            category={data.path}
            title={boardInfo ? boardInfo.title : undefined}
            img={boardInfo ? boardInfo.img : undefined}
            content={boardInfo ? boardInfo.content : undefined}
            description={boardInfo ? boardInfo.description : undefined}
            boardId={boardInfo ? boardInfo.id : undefined}
          />
          <div className="py-3">
            <div className="bg-white rounded-xl shadow-xl text-textStrongGray pb-4">
              <div className="border-b p-4 text-sm text-textBlue font-bold">
                기본 규칙들
              </div>
              <div className="text-xs p-4">
                The board에서 허락되지 않는 행위들
              </div>
              <div className="px-8 text-xs flex flex-col gap-1">
                <div>1. 저격질</div>
                <div>2. 친목질</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WriteBox = ({
  title,
  img,
  titlePlaceholder,
  descriptionPlaceholder,
  contentPlaceholder,
  category,
  boardId,
  content,
  description,
}: {
  title?: string;
  img?: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  contentPlaceholder: string;

  content?: string;
  description?: string;
  category?: string;
  boardId?: number;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const modalText = useModalText();
  const imgBtnId = "imgBox";
  const titleObj = useSimpleText(title ? title : "");
  const descriptionObj = useSimpleText(description ? description : "");

  const boardAdd = useBoardAdd(() => {
    router.replace("/category/all");
  }, modalText.openText);
  const boardRemake = useBoardRemake(() => {
    router.replace(`/category/${boardId}`);
  }, modalText.openText);
  const { uploadImg, formData, onChangeText, text, setText } = useFormDataImg(
    content ? content : "",
    120
  );

  const request = useCallback(
    async (formData: FormData) => {
      boardId
        ? await boardRemake.mutate({ formData, boardId: boardId })
        : await boardAdd.mutate(formData);
    },
    [queryClient, boardAdd, boardRemake]
  );
  const { preview } = usePreview(formData);

  const submit = useCallback(() => {
    if (
      text.length > 0 &&
      titleObj.text.length > 0 &&
      descriptionObj.text.length > 0
    )
      request(
        pushedFormData(formData, [
          { name: "content", value: text },
          { name: "title", value: titleObj.text },
          { name: "description", value: descriptionObj.text },
          { name: "category", value: category ? category : "" },
        ])
      );
  }, [formData, text, content, request, router, setText]);
  const file = useMemo(() => {
    return formData.get("img") as null | File;
  }, [formData]);
  return (
    <div>
      <div className="flex flex-col bg-white py-2 rounded-xl shadow-xl">
        <InputBox_plain
          onChange={titleObj.setText}
          value={titleObj.text}
          title={
            <div className="text-textBlue">
              제목<span className="text-xs text-textGray">(필수)</span>
            </div>
          }
          placeholder={titlePlaceholder}
          type="text"
          isUpdate={true}
        />
        <div className={"text-sm font-bold text-textBlue px-4 pt-4 pb-2"}>
          {"소개이미지"}
        </div>
        <div className="flex items-center px-2 pb-4">
          <div className={clsx("text-[#7F919E]/60", "hover:text-mainBlue")}>
            <div className="p-2">
              <label htmlFor={imgBtnId}>
                <div
                  className={clsx(
                    "p-2 border border-borderGray rounded-md",
                    "hover:border-mainBlue"
                  )}
                >
                  파일업로드
                </div>
              </label>
            </div>
          </div>
          <div>
            <div className="p-2 text-sm text-textGray">
              {file ? file.name : ""}
            </div>
          </div>
        </div>
        <div className="pb-5 px-4 text-base bg-white">
          <div className="flex">
            <div className="max-w-96 relative">
              <Image
                src={preview ? preview : img ? img : "/baseBoardImg.png"}
                width={30}
                height={30}
                alt="no image"
                className="w-full h-full"
              />
            </div>
            <div>
              <input
                type={"file"}
                multiple={false}
                name={"img"}
                onChange={uploadImg}
                id={imgBtnId}
                hidden
              />
            </div>
          </div>
        </div>
        <InputBox_plain
          onChange={descriptionObj.setText}
          value={descriptionObj.text}
          title={<div className="text-textBlue">소개글</div>}
          placeholder={descriptionPlaceholder}
          type="text"
          isUpdate={true}
        />
        <div className="px-4 py-2 flex flex-col gap-2">
          <div className={clsx("text-sm font-bold text-textBlue")}>내용</div>
          <textarea
            value={text}
            onChange={onChangeText}
            placeholder={contentPlaceholder}
            className={clsx(
              "border-[1.5px] border-borderGray px-3 py-2 focus:border-mainBlue outline-none transition-colors rounded-md"
            )}
            rows={5}
          />
        </div>
        <Modal_little closeModalCtl={modalText.close} modalCtl={modalText.is}>
          {modalText.text}
        </Modal_little>
      </div>
      <div className="py-4 grow flex items-start gap-4">
        <div>
          <Button
            size="none"
            color={
              text.length > 0 &&
              titleObj.text.length > 0 &&
              descriptionObj.text.length > 0
                ? "blue"
                : "inactiveGray"
            }
            className="px-6 py-1 text-sm"
            radius="little"
            onClick={
              text.length > 0 &&
              titleObj.text.length > 0 &&
              descriptionObj.text.length > 0
                ? submit
                : undefined
            }
          >
            작성완료
          </Button>
        </div>
        <div>
          <Button
            size="none"
            color={"onlyTextBlue"}
            className="px-6 py-1 text-sm"
            radius="little"
            onClick={() => {
              router.back();
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};
