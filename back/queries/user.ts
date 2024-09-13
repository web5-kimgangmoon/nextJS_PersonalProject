import { Op } from "sequelize";
import { front } from "../lib/temporaryLocation";
import UserInfo from "../models/userInfoList";
import { mkHash } from "../lib/util";

interface sendData {
  id: number;
  profileImg: string;
  nick: string;
  email: string;
  cmtCnt: number;
  boardsCnt: number;
  like: number;
  dislike: number;
  createdAt: Date;
}

export const getUserInfo = async (id: number) => {
  const target = await UserInfo.findOne({
    where: { id, deletedAt: null },
    // include: [{ model: Cmt,required:false}, { model: Board,as:"writtenCmts", required:false }, { model: Like, required:false }],
  });
  const sendData: sendData | undefined = target
    ? {
        id: target.id,
        profileImg: `${front}${target.profileImg}`,
        nick: target.nick,
        email: target.email,
        cmtCnt: await target.$count("writtenCmts", {
          where: { deletedAt: null },
        }),
        boardsCnt: await target.$count("writtenBoards", {
          where: { deletedAt: null },
        }),
        like: await target.$count("doLikeActs", {
          where: { isLike: true, deletedAt: null },
        }),
        dislike: await target.$count("doLikeActs", {
          where: { isDislike: true, deletedAt: null },
        }),
        createdAt: target.createdAt,
      }
    : undefined;
  return sendData;
};

export const login = async (
  id: string | null,
  pwd: string | null,
  isAdminLogin: boolean
) => {
  const option = isAdminLogin ? { authority: { [Op.not]: 0 } } : {};
  if (id && pwd) {
    return await UserInfo.findOne({
      where: {
        [Op.or]: [{ nick: id }, { email: id }],
        password: mkHash("sha256", pwd),
        deletedAt: null,
        ...option,
      },
    });
  }
};

export const regist = async (nick: string, email: string, pwd: string) => {
  const target = await UserInfo.findOne({
    where: { [Op.or]: [{ nick: nick }, { email: email }] },
  });
  if (target) return false;

  await UserInfo.create({
    nick,
    email,
    password: mkHash("sha256", pwd),
    profileImg: "baseUserImg.png",
  });
  return true;
};
