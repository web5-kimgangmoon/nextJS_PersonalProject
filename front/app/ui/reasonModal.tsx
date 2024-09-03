"use client";

import { Button } from "@/app/ui/buttons";
import { useCallback, useState } from "react";
import { Reason } from "../lib/definitions";
import { boardReport, cmtReport } from "../lib/actions";
import { useRouter } from "next/navigation";

export const ReportBox = ({
  id,
  isBoard,
  reasonList,
  isOpen,
  modalToggle,
}: {
  id: string;
  isBoard?: boolean;
  reasonList: Reason[];
  isOpen: boolean;
  modalToggle: () => void;
}) => {
  const router = useRouter();
  const [reason, setReason] = useState<string>();
  const selectReason = useCallback((str: string) => {
    setReason(str);
  }, []);
  const reportRequest = useCallback(() => {
    if (reason) isBoard ? boardReport(+id, +reason) : cmtReport(+id, +reason);
    router.refresh();
  }, [reason]);

  return (
    <ReportBoxComp
      reasonList={reasonList}
      id={isBoard ? `board${id}` : `cmt${id}`}
      setReason={selectReason}
      reason={reason}
      action={reportRequest}
      modalClose={modalToggle}
      isOpen={isOpen}
    />
  );
};

export const ReportBoxComp = ({
  id,
  reasonList,
  reason,
  isOpen,
  setReason,
  modalClose,
  action,
}: {
  id: string;
  reasonList: { value: string; title: string; description?: string }[];
  reason?: string;
  isOpen: boolean;
  setReason: (value: string) => void;
  modalClose: () => void;
  action: () => void;
}) => {
  const title = "게시글 신고 사유";
  const content = "왜 이 게시글을 신고하시나요?";
  const description =
    "타인에게 불쾌감을 주지 않도록 주의해주세요. 허위신고를 할 경우, 밴을 당할 수 있습니다.";
  const reasonName = `report${id}`;
  const actionTitle = "신고완료";
  const actionColor = "whiteRed";
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
  title: string;
  content: string;
  description: string;
  reasonName: string;
  actionTitle: string;
  actionColor: "blue" | "whiteRed";
  reason?: string;
  setReason: (value: string) => void;
  reasonList: { value: string; title: string; description?: string }[];
  modalClose: () => void;
  action: () => void;
}) => {
  return (
    <div
      className="text-xs bg-black/[3%] border border-borderGray rounded-lg text-modalText p-2"
      hidden={!isOpen}
    >
      <div className="font-bold py-2">{title}</div>
      <div className="p-2">
        <div className="font-bold">{content}</div>
        <div className="p-1">
          <ol className="font-bold flex flex-col gap-2 p-2">
            {reasonList.map((item, idx) => (
              <ReasonItem
                key={idx}
                idx={idx}
                reasonName={reasonName}
                value={item.value}
                title={item.title}
                description={item.description}
                selected={reason === item.value}
                onChange={() => setReason(item.value)}
              />
            ))}
          </ol>
        </div>
      </div>
      <div className="break-keep">{description}</div>
      <div className="py-4 flex gap-5">
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
  description?: string;
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
