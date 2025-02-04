import { Op } from "sequelize";
import { front } from "..";
import Board from "../models/boards";
import Category from "../models/categories";
import Cmt from "../models/cmts";
import UserInfo from "../models/userInfoList";
import Score from "../models/scoreList";
import Report from "../models/reportHistory";
import Reason from "../models/reasons";

export const getBoardList = async (
  path: string | null,
  offset: number,
  limit: number,
  writerId: number | undefined,
  isDeleted: boolean,
  search: string | undefined,
  searchType: string | undefined,
  onlyDeleted?: boolean | null
) => {
  interface SendData {
    boardList: Array<{
      id: number;
      title: string;
      description: string;
      createdAt: Date;
      isUpdated: boolean;
      writer: string;
      writerId: number;
      cmtCnt: number;
      img: string;
      score: number;
      scoreUserCnt: number;
      categoryPath: string;
      category: string;
    }>;
    boardCnt: number;
  }
  let condition: any = {};
  let writerCondition: any = {};
  const category = await Category.findOne({ where: { path } });
  if (search) {
    switch (searchType) {
      case "content":
        condition = { content: { [Op.like]: `%${search}%` } };
        break;
      case "title":
        condition = { title: { [Op.like]: `%${search}%` } };
        break;
      case "writer":
        writerCondition = { nick: { [Op.like]: `%${search}%` } };
        break;
      case "contentTitle":
        condition = {
          [Op.or]: [
            { content: { [Op.like]: `%${search}%` } },
            { title: { [Op.like]: `%${search}%` } },
          ],
        };
        break;
      default:
    }
  }
  if (category) condition["categoryId"] = category.id;
  if (!isDeleted) {
    condition["deletedAt"] = null;
    condition["deleteReasonId"] = null;
  }
  if (onlyDeleted) {
    condition["deletedAt"] = { [Op.not]: null };
    condition["deleteReasonId"] = { [Op.not]: null };
  }
  if (writerId) condition["writerId"] = writerId;
  const targetList = await Board.findAll({
    where: condition,
    include: [
      { model: Category, as: "category" },
      {
        model: Cmt,
        as: "cmts",
        required: false,
        where: { deletedAt: null, deleteReasonId: null },
      },
      { model: Score, as: "scores", required: false },
      { model: UserInfo, as: "writer", where: writerCondition },
    ],
    order: [["createdAt", "DESC"]],
  });
  const sendData: SendData = targetList
    ? {
        boardList: targetList.slice(offset, offset + limit).map((item) => ({
          category: item.category.name,
          categoryPath: item.category.path,
          cmtCnt: item.cmts.length,
          createdAt: item.createdAt,
          description: item.description,
          id: item.id,
          img: `${front}${item.img}`,
          isUpdated: item.createdAt.getTime() !== item.updatedAt.getTime(),
          score:
            item.scores.length > 0
              ? Math.ceil(
                  (item.scores.reduce((a, b) => {
                    return b.score + a;
                  }, 0) /
                    item.scores.length) *
                    10
                ) / 10
              : 0,
          scoreUserCnt: item.scores.length,
          title: item.title,
          writer: item.writer.nick,
          writerId: item.writerId,
        })),
        boardCnt: targetList.length,
      }
    : { boardCnt: 0, boardList: [] };
  return sendData;
};

export const getBoard = async (boardId?: number, userId?: number) => {
  interface SendData {
    id: number;
    title: string;
    content: string;
    description: string;
    createdAt: Date;
    isUpdated: boolean;
    writer: string;
    writerId: number;
    cmtCnt: number;
    category: string;
    categoryPath: string;
    img: string;
    score: number;
    scoreUserCnt: number;
    isGiveScore: boolean;
    isDidReport: boolean;
  }
  if (boardId) {
    let board = await Board.findOne({
      where: { id: boardId, deletedAt: null, deleteReasonId: null },
      include: [
        { model: UserInfo, as: "writer" },
        {
          model: Cmt,
          as: "cmts",
          required: false,
          where: { deletedAt: null, deleteReasonId: null },
        },
        { model: Category, as: "category" },
        { model: Score, as: "scores", required: false },
        {
          model: Report,
          as: "reports",
          required: false,
          where: { deletedAt: null },
        },
      ],
    });
    if (board) {
      await board.update({ looks: ++board.looks });
      const sendData: SendData = {
        id: board.id,
        category: board.category.name,
        categoryPath: board.category.path,
        cmtCnt: board.cmts.length,
        content: board.content,
        createdAt: board.createdAt,
        description: board.description,
        img: `${front}${board.img}`,
        isDidReport: board.reports.find((item) => item.reporterId === userId)
          ? true
          : false,
        isGiveScore: board.scores.find((item) => item.userId === userId)
          ? true
          : false,
        isUpdated: board.createdAt.getTime() !== board.updatedAt.getTime(),
        score:
          board.scores.length > 0
            ? Math.ceil(
                (board.scores.reduce((a, b) => b.score + a, 0) /
                  board.scores.length) *
                  10
              ) / 10
            : 0,
        writer: board.writer.nick,
        writerId: board.writerId,
        title: board.title,
        scoreUserCnt: board.scores.length,
      };
      return sendData;
    }
  }

  return undefined;
};

export const giveScore = async (
  userId: number | undefined,
  boardId: number | undefined,
  score: number | undefined
) => {
  let target;
  if (!userId || !boardId || !score) return false;
  if (
    !(await Board.findOne({
      where: { deletedAt: null, id: boardId, deleteReasonId: null },
    }))
  )
    return false;
  if (
    !(await UserInfo.findOne({
      where: { deletedAt: null, id: userId },
    }))
  )
    return false;
  target = await Score.findOne({
    where: { userId: userId, boardId: boardId, deletedAt: null },
  });
  if (!target) {
    await Score.create({
      userId: userId,
      boardId: boardId,
      score,
    });
    return true;
  }
  return false;
};

export const reportBoard = async (
  userId?: number,
  boardId?: number,
  reasonId?: number
) => {
  if (!userId || !boardId || !reasonId) return false;
  if (
    !(await Board.findOne({
      where: { deletedAt: null, id: boardId, deleteReasonId: null },
    }))
  )
    return false;
  if (!(await UserInfo.findOne({ where: { deletedAt: null, id: userId } })))
    return false;
  if (
    !(await Reason.findOne({
      where: { deletedAt: null, id: reasonId, reasonType: "BOARD_REPORT" },
    }))
  )
    return false;

  const target = await Report.findOne({
    where: { reporterId: userId, boardId: boardId, deletedAt: null },
  });
  if (target) return false;
  await Report.create({
    reporterId: userId,
    boardId,
    reasonId,
  });

  return true;
};

export const deleteBoard = async (
  userId: number,
  boardId?: number | null,
  isAdmin?: boolean
) => {
  if (!boardId) return "삭제할 대상 게시글을 지정해주세요";
  if (boardId === 1) return "해당 게시글은 삭제할 수 없는 게시글입니다";
  const target_user = await UserInfo.findOne({
    where: { id: userId, deletedAt: null },
  });
  if (!target_user) return "존재하지 않는 유저입니다";
  const target_board = await Board.findOne({
    where: { deletedAt: null, id: boardId, deleteReasonId: null },
  });
  if (!target_board) return "존재하지 않는 게시글입니다";
  if (target_board.categoryId === 1 && !isAdmin)
    return "공지 게시글은 운영자 페이지에서만 삭제가능합니다. ";
  if (target_board.writerId !== userId) return "작성자가 아닙니다";
  await target_board.update({ deletedAt: new Date() });
  return true;
};

export const updateBoard = async (
  userId: number,
  boardId?: number | null,
  title?: string | null,
  content?: string | null,
  description?: string | null,
  img?: string | null,
  isAdmin?: boolean
) => {
  if (!boardId) return "수정할 대상 게시글을 지정해주세요";
  const target_user = await UserInfo.findOne({
    where: { id: userId, deletedAt: null },
  });
  if (!target_user) return "존재하지 않는 유저입니다";
  const target_board = await Board.findOne({
    where: { deletedAt: null, id: boardId, deleteReasonId: null },
  });
  if (!target_board) return "존재하지 않는 게시글입니다";
  if (target_board.categoryId === 1 && !isAdmin)
    return "공지 게시글은 운영자 페이지에서만 수정가능합니다. ";
  if (target_board.writerId !== userId) return "작성자가 아닙니다";
  await target_board.update({
    title,
    content,
    description,
    img: img ? img : target_board.img,
  });
  return true;
};

export const addBoard = async (
  userId: number,
  title?: string | null,
  content?: string | null,
  description?: string | null,
  category?: string | null,
  img?: string | null,
  isAdmin?: boolean
) => {
  if (!category) return "게시글을 추가할 카테고리가 필요합니다";
  const target_user = await UserInfo.findOne({
    where: { id: userId, deletedAt: null },
  });
  if (!target_user) return "존재하지 않는 유저입니다";
  const target_category = await Category.findOne({
    where: { deletedAt: null, path: category },
  });
  if (!target_category) return "존재하지 않는 카테고리입니다";
  if (target_category.id === 1 && !isAdmin)
    return "공지 게시글은 운영자 페이지에서만 추가가능합니다. ";
  await Board.create({
    title,
    content,
    description,
    img: img ? img : "baseBoardImg.png",
    writerId: userId,
    categoryId: target_category.id,
  });
  return true;
};
