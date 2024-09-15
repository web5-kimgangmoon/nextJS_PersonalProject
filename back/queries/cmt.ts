import { Op } from "sequelize";
import { front } from "../server";
import UserInfo from "../models/userInfoList";
import { cmtMake, cmtRemake, mkHash } from "../lib/util";
import Cmt from "../models/cmts";
import Like from "../models/likeList";
import Report from "../models/reportHistory";
import Board from "../models/boards";
import Category from "../models/categories";
import Reason from "../models/reasons";

interface GetCmts {
  limit: number;
  onlyDeleted?: boolean;
  userId?: number;
  isDeleted?: boolean;
  search?: string | null;
  boardId: number | null;
  searchType?: string | null;
  sort?: string | null;
  isOwn: boolean;
}
export const getCmts = async (get: GetCmts) => {
  interface CmtItem {
    id: number;
    writer: string;
    writerId: number;
    writerProfile: string;
    createdAt: Date;
    content: string;
    like: number;
    dislike: number;
    isDoLike: boolean;
    isDoDisLike: boolean;
    isDidReport: boolean;
    boardId: number;
    categoryPath: string;
    category: string;
    boardTitle: string;
    replyId?: number;
    replyUserId?: number;
    replyUser?: string;
    containCmt?: CmtItem[];
  }
  interface SendData {
    cmtList: Array<CmtItem>;
    cmtCnt: number;
  }
  let cmts: Cmt[] = [];
  let condition: any = { replyId: null };
  let writerCondition: any = {};
  let order: any = [];
  let limitOption: any = { limit: get.limit };
  // if (!get.isDeleted) condition["deletedAt"] = null;
  if (get.onlyDeleted) condition["deletedAt"] = { [Op.not]: null };
  if (get.search && get.searchType) {
    switch (get.searchType) {
      case "content":
        condition["content"] = { [Op.like]: `%${get.search}%` };
        break;
      case "writer":
        writerCondition["nick"] = { [Op.like]: `%${get.search}%` };
        break;
      case "contentWriter":
        condition["content"] = { [Op.like]: `%${get.search}%` };
        writerCondition["nick"] = { [Op.like]: `%${get.search}%` };
        break;
      default:
    }
  }
  if (get.isOwn && get.userId) condition["writerId"] = get.userId;
  if (get.boardId) condition["boardId"] = get.boardId;
  switch (get.sort) {
    case "old":
      order = [["createdAt", "ASC"]];
      break;
    case "recently":
      order = ["createdAt"];
      break;
    case "like":
    default:
      order = ["createdAt"];
      limitOption = {};
  }
  if (!(get.sort === "old") && !(get.sort === "recently")) {
    cmts = await Cmt.findAll({
      include: [
        { model: UserInfo, as: "writer", where: writerCondition },
        { model: Like, as: "likeList", required: false },
      ],
      where: condition,
      order: order,
    });
    cmts = cmts
      .sort(
        (a, b) =>
          b.likeList!.filter((a) => a.isLike).length -
          a.likeList!.filter((a) => a.isLike).length
      )
      .slice(0, get.limit);
  } else {
    cmts = await Cmt.findAll({
      include: [{ model: UserInfo, as: "writer", where: writerCondition }],
      where: condition,
      order: order,
      ...limitOption,
    });
  }
  const getCmt = async (cmt: Cmt, userId?: number): Promise<CmtItem | null> => {
    const board = await cmt.$get("board");
    const category = await board?.$get("category");
    const reports = await cmt.$get("reports");
    const likeList = await cmt.$get("likeList");
    const writer = await cmt.$get("writer");
    const replyCmtToWriter = await (
      await cmt.$get("replyCmtTo")
    )?.$get("writer");
    const replyCmtsFrom = await cmt.$get("replyCmtsFrom");
    const like = likeList?.filter((item) => item.isLike).length;
    const dislike = likeList?.filter((item) => item.isDisLike).length;
    const deleteReason = await cmt.$get("deleteReason");
    const userLike = likeList?.find((item) => item.userId === userId);
    const cmtItems: CmtItem[] = [];
    if (replyCmtsFrom) {
      for (let item of replyCmtsFrom) {
        const temp = await getCmt(item);
        temp && cmtItems.push(temp);
      }
    }

    return cmt.deletedAt && cmtItems.length === 0 && !get.isDeleted
      ? null
      : {
          boardId: cmt.boardId,
          boardTitle: board!.title,
          category: category!.name,
          categoryPath: category!.path,
          content: !cmt.deletedAt
            ? cmt.content
            : cmtMake(
                `${
                  deleteReason
                    ? "'" +
                      deleteReason.title +
                      "'" +
                      " 사유에 의해 삭제된 댓글입니다)"
                    : ""
                }`,
                "(*삭제된 댓글입니다)"
              ).cmt,
          createdAt: cmt.createdAt,
          id: cmt.id,

          like: like ? like : 0,
          dislike: dislike ? dislike : 0,
          replyId: cmt.replyId,
          replyUser: replyCmtToWriter?.nick,
          replyUserId: replyCmtToWriter?.id,
          writer: writer!.nick,
          writerId: cmt.writerId,
          writerProfile: `${front}${
            writer?.profileImg ? writer?.profileImg : `baseUserImg.png`
          }`,
          containCmt: cmtItems,
          isDoLike: userLike?.isLike ? true : false,
          isDoDisLike: userLike?.isDisLike ? true : false,
          isDidReport: reports?.find((item) => item.reporterId === get.userId)
            ? true
            : false,
        };
  };
  const sendData: SendData = {
    cmtCnt: (
      await Cmt.findAll({
        where: condition,
        include: [{ model: UserInfo, as: "writer", where: writerCondition }],
      })
    ).length,
    cmtList: [],
  };
  for (let item of cmts) {
    const temp = await getCmt(item, get.userId);
    temp && sendData["cmtList"].push(temp);
  }
  return sendData;
};

export const deleteCmt = async (userId?: number, cmtId?: number) => {
  if (!userId || !cmtId) return false;
  const target = await Cmt.findOne({
    where: { writerId: userId, id: cmtId, deletedAt: null },
  });
  if (target) {
    const result = cmtRemake(target.content, "(*삭제됨)");
    if (result) {
      await target.update({ deletedAt: new Date() });
      await target.update({
        content: result.cmt,
      });
      return true;
    }
  }
  return false;
};
export const addCmt = async (
  {
    userId,
    boardId,
    replyId,
  }: { boardId?: number; replyId?: number; userId: number },
  content: string,
  img?: string
) => {
  const board = boardId
    ? await Board.findOne({ where: { id: boardId } })
    : undefined;
  const cmt = replyId
    ? await Cmt.findOne({ where: { id: replyId } })
    : undefined;
  if (!board && !cmt) return false;
  if ((!content || content.length === 0) && !img) return false;
  const result = img
    ? cmtMake(content, "", `${front}${img}`)
    : cmtMake(content);

  return cmt
    ? await Cmt.create({
        boardId: cmt.boardId,
        writerId: userId,
        content: result.cmt,
        replyId,
      })
    : await Cmt.create({
        boardId: boardId,
        writerId: userId,
        content: result.cmt,
      });
};

export const updateCmt = async (
  userId: number,
  cmtId: number,
  isDeleteImg: boolean,
  content?: string,
  reImg?: string
) => {
  const target = await Cmt.findOne({
    where: { writerId: userId, id: cmtId, deletedAt: null },
  });
  if ((!content || content.length === 0) && !reImg) return false;
  if (!target) return false;
  const pre = cmtRemake(target.content);
  if (!pre) return false;

  let result;
  if (reImg) {
    result = cmtRemake(
      target.content,
      "(*수정됨)",
      content ? content : "",
      `${front}${reImg}`
    );
  } else {
    result = isDeleteImg
      ? cmtMake(content ? content : "", "(*수정됨)")
      : cmtRemake(target.content, "(*수정됨)", content);
  }
  if (result) {
    await target.update({ updatedAt: new Date() });
    await target.update({
      content: result.cmt,
    });
    return true;
  }
};

export const likeCmt = async (
  userId: number | undefined,
  cmtId: number | undefined,
  isDisLike: boolean
) => {
  let target;
  if (!userId || !cmtId) return false;
  if (!(await Cmt.findOne({ where: { deletedAt: null, id: cmtId } })))
    return false;
  if (!(await UserInfo.findOne({ where: { deletedAt: null, id: userId } })))
    return false;
  target = await Like.findOne({
    where: { userId: userId, cmtId: cmtId, deletedAt: null },
  });
  if (!target) {
    target = await Like.create({
      userId: userId,
      cmtId: cmtId,
      isDisLike: false,
      isLike: false,
    });
  }
  if (isDisLike) {
    await target.update("isDisLike", !target.isDisLike);
  } else {
    await target.update("isLike", !target.isLike);
  }
  return true;
};

export const reportCmt = async (
  userId?: number,
  cmtId?: number,
  reasonId?: number
) => {
  if (!userId || !cmtId || !reasonId) return false;
  if (!(await Cmt.findOne({ where: { deletedAt: null, id: cmtId } })))
    return false;
  if (!(await UserInfo.findOne({ where: { deletedAt: null, id: userId } })))
    return false;
  if (
    !(await Reason.findOne({
      where: { deletedAt: null, id: reasonId, reasonType: "CMT_REPORT" },
    }))
  )
    return false;
  const target = await Report.findOne({
    where: { reporterId: userId, cmtId: cmtId, deletedAt: null },
  });
  if (target) return false;
  await Report.create({
    reporterId: userId,
    cmtId: cmtId,
    reasonId,
  });

  return true;
};
