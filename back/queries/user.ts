import { Op } from "sequelize";
import { front } from "../server";
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
          where: { deletedAt: null, deleteReasonId: null },
        }),
        boardsCnt: await target.$count("writtenBoards", {
          where: { deletedAt: null, deleteReasonId: null },
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
  if (!id || !pwd) return "제대로 입력해주세요";
  let target = await UserInfo.findOne({
    where: {
      deletedAt: null,
      [Op.or]: [{ nick: id }, { email: id }],
    },
  });
  if (!target) return "사용자가 존재하지 않습니다";
  if (target.password !== mkHash("sha256", pwd)) return "패스워드가 틀렸습니다";
  if (isAdminLogin && target.authority === 0) return "운영자 권한이 없습니다.";

  if (target.connectId)
    target = await UserInfo.findOne({ where: { id: target.connectId } });
  if (!target || target.deletedAt) return "사용자가 존재하지 않습니다.";

  const banList = await target.$get("banList", {
    limit: 1,
    order: [["createdAt", "DESC"]],
  });
  if (
    banList[0] &&
    banList[0].willBanEndAt.getTime() > Date.now() &&
    banList[0].banCnt > 0
  )
    return `해당 사용자는 밴이 되었습니다. 밴 종료까지 앞으로 약 ${Math.ceil(
      banList[0].willBanEndAt.getTime() / 86400000
    )}일 남았습니다.`;
  return target;
};

export const regist = async (nick: string, email: string, pwd: string) => {
  const target = await UserInfo.findOne({
    where: { [Op.or]: [{ nick: nick }, { email: email }] },
  });
  if (target && target.nick === nick)
    return "다른 유저가 해당 닉네임을 사용하고 있습니다.";
  if (target && target.email === email)
    return "다른 유저가 해당 이메일을 사용하고 있습니다.";

  await UserInfo.create({
    nick,
    email,
    password: mkHash("sha256", pwd),
    profileImg: "baseUserImg.png",
  });
  return true;
};
