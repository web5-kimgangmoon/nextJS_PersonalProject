import { front } from "..";
import Board from "../models/boards";
import Category from "../models/categories";
import CategoryRule from "../models/categoryRuleList";
import Cmt from "../models/cmts";
import UserInfo from "../models/userInfoList";

export const getCategory = async (category: string | null) => {
  interface SendData {
    path: string;
    name: string;
    img: string;
    description: string;
    cmtPlaceholder: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    contentPlaceholder: string;
    boardCnt: number;
    rules: Array<string>;
    informBoard: {
      id: number;
      title: string;
      description: string;
      createdAt: Date;
      writer: string;
      writerId: number;
      cmtCnt: number;
      img: string;
    };
  }

  if (category !== null && category) {
    const target = await Category.findOne({
      where: { deletedAt: null, path: category },
      include: [
        {
          model: Board,
          as: "informBoard",
          where: { deletedAt: null },
          required: false,
          include: [
            {
              model: UserInfo,
              as: "writer",
            },
            {
              model: Cmt,
              as: "cmts",
              required: false,
              where: { deletedAt: null, deleteReasonId: null },
            },
          ],
        },
        {
          model: Board,
          as: "boards",
          where: { deletedAt: null, deleteReasonId: null },
          required: false,
        },
        {
          model: CategoryRule,
          as: "rules",
          where: { deletedAt: null },
          required: false,
        },
      ],
    });
    if (target) {
      const sendData: SendData = {
        path: target.path,
        name: target.name,
        img: `${front}${target.img}`,
        description: target.description,
        cmtPlaceholder: target.cmtPlaceholder,
        titlePlaceholder: target.titlePlaceholder,
        descriptionPlaceholder: target.descriptionPlaceholder,
        contentPlaceholder: target.contentPlaceholder,
        boardCnt: target.boards.length,
        rules: target.rules.map((item) => item.description),
        informBoard: {
          id: target.informBoard.id,
          title: target.informBoard.title,
          description: target.informBoard.description,
          createdAt: target.informBoard.createdAt,
          writer: target.informBoard.writer.nick,
          writerId: target.informBoard.writerId,
          cmtCnt: target.informBoard.cmts.length,
          img: `${front}${target.informBoard.img}`,
        },
      };
      return sendData;
    }
  }

  const allBoard = await Board.findAll({
    where: { deletedAt: null, deleteReasonId: null },
  });
  const defaultCategory = await Category.findOne({
    where: { id: 1 },
    include: [
      {
        model: Board,
        as: "informBoard",
        where: { deletedAt: null, deleteReasonId: null },
        include: [
          {
            model: UserInfo,
            as: "writer",
          },
          {
            model: Cmt,
            as: "cmts",
            required: false,
            where: { deletedAt: null, deleteReasonId: null },
          },
        ],
        required: true,
      },
      {
        model: CategoryRule,
        as: "rules",
        where: { deletedAt: null },
        required: false,
      },
    ],
  });
  const inform = defaultCategory?.informBoard as Board;
  const sendData: SendData = {
    path: "all",
    name: "전체",
    img: `${front}${defaultCategory?.img}`,
    description: "더미",
    cmtPlaceholder: "더미",
    titlePlaceholder: "더미",
    descriptionPlaceholder: "더미",
    contentPlaceholder: "더미",
    boardCnt: allBoard.length,
    rules: defaultCategory?.rules
      ? defaultCategory?.rules.map((item) => item.description)
      : [],
    informBoard: {
      id: inform.id,
      title: inform?.title,
      description: inform.description,
      createdAt: inform?.createdAt,
      writer: inform?.writer.nick,
      writerId: inform?.writerId,
      img: `${front}${inform.img}`,
      cmtCnt: inform?.cmts.length ? inform?.cmts.length : 0,
    },
  };
  return sendData;
};

export const getCategoryList = async () => {
  const categoryList = await Category.findAll({
    where: {
      deletedAt: null,
    },
    attributes: ["path", "name", "img", "description", "id"],
  });
  return {
    categories: categoryList.map((item) => ({
      path: item.path,
      name: item.name,
      img: `${front}${item.img}`,
      description: item.description,
    })),
  };
};

export const getCategoryRules = async (category?: string | null) => {
  if (!category) return false;

  const targetCategory = await Category.findOne({
    where: {
      deletedAt: null,
    },
  });
  if (!targetCategory) return false;
  const rules = await CategoryRule.findAll({
    where: { deletedAt: null, categoryId: targetCategory.id },
  });
  return {
    rules: rules,
  };
};
