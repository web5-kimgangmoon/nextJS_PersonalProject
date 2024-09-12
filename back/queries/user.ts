import { front } from "../lib/temporaryLocation";
import Board from "../models/boards";
import Cmt from "../models/cmts";
import Like from "../models/likeList";
import UserInfo from "../models/userInfoList";

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
