import { Op } from "sequelize";
import { front } from "../lib/temporaryLocation";
import Board from "../models/boards";
import Category from "../models/categories";
import Cmt from "../models/cmts";
import UserInfo from "../models/userInfoList";
import Score from "../models/scoreList";

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
    offset: offset,
    limit: limit,
    include: [
      { model: Category, as: "category" },
      { model: Cmt, as: "cmts", required: false },
      { model: Score, as: "scores", required: false },
      { model: UserInfo, as: "writer" },
    ],
  });
  const sendData: SendData = targetList
    ? {
        boardList: targetList.map((item) => ({
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
