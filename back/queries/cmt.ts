import { Op } from "sequelize";
import { front } from "../lib/temporaryLocation";
import UserInfo from "../models/userInfoList";
import { mkHash } from "../lib/util";
import Cmt from "../models/cmts";
import Like from "../models/likeList";
import Report from "../models/reportHistory";
import Board from "../models/boards";
import Category from "../models/categories";

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
  }
  interface SendData {
    cmtList: Array<{
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
    }>;
    cmtCnt: number;
  }
  let cmts: Cmt[] = [];
  let condition: any = {};
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
        {
          model: Board,
          as: "board",
          include: [{ model: Category, as: "category" }],
        },
        { model: UserInfo, as: "writer", where: writerCondition },
        { model: Like, as: "likeList", required: false },
        { model: Report, as: "reports", required: false },
        {
          model: Cmt,
          as: "replyCmtTo",
          required: false,
          include: [{ model: UserInfo, as: "writer", where: writerCondition }],
        },
        { model: Cmt, as: "replyCmtsFrom", required: false },
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
        {
          model: Board,
          as: "board",
          include: [{ model: Category, as: "category" }],
        },
        { model: UserInfo, as: "writer", where: writerCondition },
        { model: Like, as: "likeList", required: false },
        { model: Report, as: "reports", required: false },
        {
          model: Cmt,
          as: "replyCmtTo",
          required: false,
          include: [{ model: UserInfo, as: "writer" }],
        },
        { model: Cmt, as: "replyCmtsFrom", required: false },
      ],
      where: condition,
      order: order,
      ...limitOption,
    });
  }
  const sendData: SendData = {
    cmtCnt: cmts.length,
    cmtList: cmts.map((item) => ({
      boardId: item.boardId,
      boardTitle: item.board.title,
      category: item.board.category.name,
      categoryPath: item.board.category.path,
      content: item.content,
      createdAt: item.createdAt,
      id: item.id,
      isDidReport: item.reports.find((item) => item.reporterId === get.userId)
        ? true
        : false,
      isDoDislike: item.likeList?.find(
        (item) => item.userId === get.userId && item.isDisLike
      )
        ? true
        : false,
      isDoLike: item.likeList?.find(
        (item) => item.userId === get.userId && item.isLike
      )
        ? true
        : false,
      like: item.likeList?.filter((item) => item.isLike).length
        ? item.likeList?.filter((item) => item.isLike).length
        : 0,
      dislike: item.likeList?.filter((item) => item.isDisLike).length
        ? item.likeList?.filter((item) => item.isDisLike).length
        : 0,
      replyId: item.replyId,
      replyUser: item?.replyCmtTo?.writer.nick,
      replyUserId: item?.replyCmtTo?.writer.id,
      writer: item.writer.nick,
      writerId: item.writerId,
      writerProfile: `${front}${item.writer.profileImg}`,
      containCmt: item.replyCmtsFrom.map((item) => ({
        boardId: item.boardId,
        boardTitle: item.board.title,
        category: item.board.category.name,
        categoryPath: item.board.category.path,
        content: item.content,
        createdAt: item.createdAt,
        id: item.id,
        isDidReport: item.reports.find((item) => item.reporterId === get.userId)
          ? true
          : false,
        isDoDislike: item.likeList?.find(
          (item) => item.userId === get.userId && item.isDisLike
        )
          ? true
          : false,
        isDoLike: item.likeList?.find(
          (item) => item.userId === get.userId && item.isLike
        )
          ? true
          : false,
        like: item.likeList?.filter((item) => item.isLike).length
          ? item.likeList?.filter((item) => item.isLike).length
          : 0,
        dislike: item.likeList?.filter((item) => item.isDisLike).length
          ? item.likeList?.filter((item) => item.isDisLike).length
          : 0,
        replyId: item.replyId,
        replyUser: item?.replyCmtTo?.writer.nick,
        replyUserId: item?.replyCmtTo?.writer.id,
        writer: item.writer.nick,
        writerId: item.writerId,
        writerProfile: `${front}${item.writer.profileImg}`,
      })),
    })),
  };
  return sendData;
};


const deleteCmt = async (id:number) => {
  const target = await Cmt.findByPk(id);
  if(target){
  await target.update("deleteAt", new Date());
 target?.content.split(`<span style="color: #042552;font-size: 0.75rem;">`)[1];
`<span class="cmtTextContent">`
}
  return target;
}