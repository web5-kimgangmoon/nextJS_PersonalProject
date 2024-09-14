import { Op } from "sequelize";
import { front } from "../lib/temporaryLocation";
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
    isDoDislike: boolean;
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
  if (!get.isDeleted) condition["deletedAt"] = null;
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
  if (get.userId) condition["writerId"] = get.userId;
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
        // {
        //   model: Board,
        //   as: "board",
        //   include: [{ model: Category, as: "category" }],
        // },
        { model: UserInfo, as: "writer", where: writerCondition },
        { model: Like, as: "likeList", required: false },
        // { model: Report, as: "reports", required: false },
        // {
        //   model: Cmt,
        //   as: "replyCmtTo",
        //   required: false,
        //   include: [{ model: UserInfo, as: "writer", where: writerCondition }],
        // },
        // { model: Cmt, as: "replyCmtsFrom", required: false },
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
      include: [
        // {
        //   model: Board,
        //   as: "board",
        //   include: [{ model: Category, as: "category" }],
        // },
        { model: UserInfo, as: "writer", where: writerCondition },
        // { model: Like, as: "likeList", required: false },
        // { model: Report, as: "reports", required: false },
        // {
        //   model: Cmt,
        //   as: "replyCmtTo",
        //   required: false,
        //   include: [{ model: UserInfo, as: "writer" }],
        // },
        // { model: Cmt, as: "replyCmtsFrom", required: false },
      ],
      where: condition,
      order: order,
      ...limitOption,
    });
  }
  const getCmt = async (cmt: Cmt): Promise<CmtItem> => {
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

    const cmtItems: CmtItem[] = [];
    if (replyCmtsFrom) {
      for (let item of replyCmtsFrom) {
        cmtItems.push(await getCmt(item));
      }
    }
    return {
      boardId: cmt.boardId,
      boardTitle: board!.title,
      category: category!.name,
      categoryPath: category!.path,
      content: cmt.content,
      createdAt: cmt.createdAt,
      id: cmt.id,
      isDidReport: reports?.find((item) => item.reporterId === get.userId)
        ? true
        : false,
      isDoDislike: likeList?.find(
        (item) => item.userId === get.userId && item.isDisLike
      )
        ? true
        : false,
      isDoLike: likeList?.find(
        (item) => item.userId === get.userId && item.isLike
      )
        ? true
        : false,
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
    sendData["cmtList"].push(await getCmt(item));
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
  userId: number,
  boardId: number,

  content: string,
  replyId?: number,
  img?: string
) => {
  const board = await Board.findOne({ where: { id: boardId } });
  if (!board) return false;
  const reply = replyId ? { replyId: replyId } : {};
  const result = cmtMake(content, img);
  return await Cmt.create({
    boardId: boardId,
    writerId: userId,
    content: result.cmt,
    ...reply,
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
  if (target) {
    const result = isDeleteImg
      ? cmtRemake(target.content, "(*수정됨)", content, reImg)
      : cmtRemake(target.content, "(*수정됨)", content);
    if (result) {
      await target.update({ updatedAt: new Date() });
      await target.update({
        content: result.cmt,
      });
      return true;
    }
  }
  return false;
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
    target.update("isDisLike", !target.isDisLike);
  } else {
    target.update("isLike", !target.isLike);
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
