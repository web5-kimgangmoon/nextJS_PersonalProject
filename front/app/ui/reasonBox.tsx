"use client";

import { Button } from "@/app/ui/buttons";
import { useCallback, useState } from "react";
import { ButtonColors, Reason } from "../lib/definitions";
import { useBoardReport, useCmtReport } from "../lib/actions";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { Modal_little } from "./modal";
import { useModalText } from "../hooks/modal";

export const ReportBox = ({
  id,
  isBoard,
  reasonList,
  isOpen,
  modalClose,
}: {
  id: number;
  isBoard?: boolean;
  reasonList: Reason[];
  isOpen: boolean;
  modalClose: () => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState<string>();
  const selectReason = useCallback((str: string) => {
    setReason(str);
  }, []);
  const textModal = useModalText();
  const boardReport = useBoardReport(
    () => queryClient.refetchQueries({ queryKey: ["get", "board"] }),
    textModal.openText
  );
  const cmtReport = useCmtReport(
    () => queryClient.refetchQueries({ queryKey: ["get", "cmt", "list"] }),
    textModal.openText
  );
  const reportRequest = useCallback(() => {
    if (reason)
      isBoard
        ? boardReport.mutate({ boardId: id, reasonId: +reason })
        : cmtReport.mutate({ cmtId: id, reasonId: +reason });
    modalClose();
  }, [
    reason,
    id,
    isBoard,
    modalClose,
    router,
    boardReport,
    cmtReport,
    queryClient,
  ]);

  return (
    <>
      <Modal_little closeModalCtl={textModal.close} modalCtl={textModal.is}>
        <div>{textModal.text}</div>
      </Modal_little>
      <ReportBoxComp
        reasonList={reasonList}
        id={id}
        setReason={selectReason}
        reason={reason}
        action={reportRequest}
        modalClose={modalClose}
        isOpen={isOpen}
        isBoard={isBoard}
      />
    </>
  );
};

export const ReportBoxComp = ({
  id,
  reasonList,
  reason,
  isOpen,
  isBoard,
  setReason,
  modalClose,
  action,
}: {
  id: number;
  reasonList: Reason[];
  reason?: string;
  isOpen: boolean;
  isBoard?: boolean;
  setReason: (value: string) => void;
  modalClose: () => void;
  action: () => void;
}) => {
  const title = isBoard ? "게시글 신고 사유" : "댓글 신고 사유";
  const content = isBoard
    ? "왜 이 게시글을 신고하시나요?"
    : "왜 이 댓글을 신고하시나요?";
  const description =
    "타인에게 불쾌감을 주지 않도록 주의해주세요. 허위신고를 할 경우, 밴을 당할 수 있습니다.";
  const reasonName = `report${isBoard ? "Board" : "Cmt"}${id}`;
  const actionTitle = "신고완료";
  const actionColor = "red";
  return (
    <ReasonBox
      isOpen={isOpen}
      title={title}
      content={content}
      description={description}
      reasonName={reasonName}
      actionTitle={actionTitle}
      actionColor={actionColor}
      reasonList={reasonList}
      reason={reason}
      setReason={setReason}
      modalClose={modalClose}
      action={action}
    />
  );
};

export const CheckDelete = ({
  isOpen,
  targetName,
  modalClose,
  action,
  destination,
}: {
  isOpen: boolean;
  targetName: string;
  modalClose: () => void;
  action: () => void;
  destination?: string;
}) => {
  return (
    <CheckBox
      isOpen={isOpen}
      action={action}
      modalClose={modalClose}
      actionColor="red"
      actionContent={`정말로 ${targetName}을(를) 삭제하시나요?`}
      actionTitle={"삭제완료"}
      destination={destination}
    />
  );
};

export const CheckBox = ({
  isOpen,
  action,
  modalClose,
  actionContent,
  actionColor,
  actionTitle,
  destination,
}: {
  isOpen: boolean;
  action: () => void;
  actionContent: string;
  actionColor: ButtonColors;
  actionTitle: string;
  modalClose: () => void;
  destination?: string;
}) => {
  const router = useRouter();
  const request = useCallback(() => {
    action();
    modalClose();
    destination && router.replace(destination);
    router.refresh();
  }, [action, destination, modalClose, router]);
  return (
    <ReasonBox
      content={actionContent}
      actionColor={actionColor}
      actionTitle={actionTitle}
      reason={"letsGO"}
      action={request}
      modalClose={modalClose}
      isOpen={isOpen}
    />
  );
};

export const ReasonBox = ({
  isOpen,
  title,
  content,
  description,
  reasonName,
  actionTitle,
  actionColor,
  reason,
  setReason,
  reasonList,
  modalClose,
  action,
}: {
  isOpen: boolean;
  title?: string;
  content: string;
  description?: string;
  reasonName?: string;
  actionTitle: string;
  actionColor: ButtonColors;
  reason?: string;
  setReason?: (value: string) => void;
  reasonList?: Reason[];
  modalClose: () => void;
  action: () => void;
}) => {
  return (
    <div
      className="text-sm bg-black/[3%] border border-borderGray rounded-lg text-modalText p-2"
      hidden={!isOpen}
    >
      {title && <div className="font-bold py-2">{title}</div>}
      <div className="p-2">
        <div className={clsx(title && "font-bold")}>{content}</div>
        {reasonList && reasonName && (
          <div className="p-1">
            <ol className="font-bold flex flex-col gap-4 p-2">
              {reasonList.map((item) => (
                <ReasonItem
                  key={item.id}
                  idx={item.id}
                  reasonName={reasonName}
                  value={String(item.id)}
                  title={item.title}
                  description={item.description}
                  selected={reason === String(item.id)}
                  onChange={() => setReason && setReason(String(item.id))}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
      {description && <div className="break-keep">{description}</div>}
      <div className={clsx("py-4 flex gap-5 text-base", !title && "px-2")}>
        <Button
          color={reason ? actionColor : "inactiveGray"}
          size="small"
          onClick={action}
          radius="little"
        >
          {actionTitle}
        </Button>

        <Button color="gray" size="small" onClick={modalClose} radius="little">
          취소
        </Button>
      </div>
    </div>
  );
};

export const ReasonItem = ({
  idx,
  reasonName,
  value,
  title,
  description,
  selected,
  onChange,
}: {
  idx: number;
  reasonName: string;
  value: string;
  title: string;
  description?: string | null;
  selected?: boolean;
  onChange?: () => void;
}) => {
  return (
    <li className="flex gap-2">
      <div className="flex items-start">
        <input
          id={`${reasonName}_reason_${idx}`}
          type={"radio"}
          name={reasonName}
          value={value}
          checked={selected}
          onChange={onChange}
        />
      </div>
      <label htmlFor={`${reasonName}_reason_${idx}`}>
        {title}
        <span className="font-normal">
          {description ? " — " + description : ""}
        </span>
      </label>
    </li>
  );
};
