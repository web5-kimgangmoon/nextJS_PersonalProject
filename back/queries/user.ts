import { Op } from "sequelize";
import { front } from "..";
import UserInfo from "../models/userInfoList";
import { mkHash } from "../lib/util";
import Like from "../models/likeList";
import Cmt from "../models/cmts";

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
  });
  if (target) {
    const likeList = await Like.findAll({
      where: { deletedAt: null },
      include: { model: Cmt, as: "cmt", where: { writerId: target.id } },
    });
    const sendData: sendData = {
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
      like: likeList.filter((item) => item.isLike).length,
      dislike: likeList.filter((item) => item.isDislike).length,
      createdAt: target.createdAt,
    };
    return sendData;
  } else {
    return undefined;
  }
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
  if (target) {
    if (target.nick === nick && target.email !== email)
      return "다른 유저가 해당 닉네임을 사용하고 있습니다.";

    if (!target.deletedAt && target.email === email)
      return "다른 유저가 해당 이메일을 사용하고 있습니다.";

    if (target.connectId) {
      const base = await target.$get("baseUser");
      if (base?.deletedAt)
        return `연동된 계정이 삭제되었습니다. 해당 계정의 이메일은 ${
          "***" + base.email.slice(3)
        }입니다.`;
    }

    if (target.deletedAt)
      await target.update({
        nick,
        email,
        password: mkHash("sha256", pwd),
        profileImg: "baseUserImg.png",
        deletedAt: null,
      });
  } else if (!target)
    await UserInfo.create({
      nick,
      email,
      password: mkHash("sha256", pwd),
      profileImg: "baseUserImg.png",
    });
  return true;
};
export const profileUpdate = async (
  id?: number | null,
  nick?: string | null,
  img?: string | null
) => {
  if (!id) return "로그인 중인 사용자가 아닙니다";
  if (!nick) return "닉네임을 입력해주세요";
  if (nick) {
    const target = await UserInfo.findOne({
      where: { nick: nick, id: { [Op.not]: id } },
    });

    if (target) {
      if (target.nick === nick)
        return "다른 유저가 해당 닉네임을 사용하고 있습니다";
    }
  }
  const user = await UserInfo.findOne({
    where: { id, deletedAt: null },
  });
  if (!user) return "존재하지 않는 사용자입니다";
  const profileImg = img ? { profileImg: img } : {};
  await user.update({
    nick,
    ...profileImg,
  });
  return true;
};

export const withdraw = async (id?: number | null) => {
  if (id === 1) return "메인관리자는 회원탈퇴할 수 없습니다";
  if (!id) return "비로그인 상태입니다";
  const target = await UserInfo.findOne({ where: { id, deletedAt: null } });
  if (!target) return "존재하지 않는 유저입니다";
  await target.update({ deletedAt: new Date() });
  return true;
};
