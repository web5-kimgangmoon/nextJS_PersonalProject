import { Op } from "sequelize";
import { front } from "../lib/imgPath";
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
  searchType: string | undefined
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

  const category = await Category.findOne({ where: { path } });
  if (search) {
    switch (searchType) {
      case "content":
        condition = { content: { [Op.like]: `%${search}%` } };
        break;
      case "title":
        condition = { title: { [Op.like]: `%${search}%` } };
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
  if (!isDeleted) condition["deletedAt"] = null;
  if (writerId) condition["writerId"] = writerId;
  const targetList = await Board.findAll({
    where: condition,
    include: [
      { model: Category, as: "category" },
      { model: Cmt, as: "cmts", required: false, where: { deletedAt: null } },
      { model: Score, as: "scores", required: false },
      { model: UserInfo, as: "writer" },
    ],
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
            item.scores.reduce((a, b) => {
              return b.score + a;
            }, 0) / item.scores.length,
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
    const board = await Board.findOne({
      where: { id: boardId, deletedAt: null },
      include: [
        { model: UserInfo, as: "writer" },
        { model: Cmt, as: "cmts", required: false, where: { deletedAt: null } },
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
          board.scores.reduce((a, b) => b.score + a, 0) / board.scores.length,
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
  if (!(await Board.findOne({ where: { deletedAt: null, id: boardId } })))
    return false;
  if (!(await UserInfo.findOne({ where: { deletedAt: null, id: userId } })))
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
  if (!(await Board.findOne({ where: { deletedAt: null, id: boardId } })))
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
