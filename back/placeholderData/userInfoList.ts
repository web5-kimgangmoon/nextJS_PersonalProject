import { mkHash } from "../lib/util";
import UserInfo from "../models/userInfoList";

export const createUsers = async () => {
  await UserInfo.create({
    email: "admin1@naver.com",
    authority: 2,
    profile: "baseUserImg.png",
    nick: "관리자",
    password: mkHash("sha256", "admin1!@#"),
  });

  const data = [
    {
      email: "person1@naver.com",
      authority: 1,
      profile: "baseUserImg.png",
      nick: "부관리자",
      password: "rkdans12!",
    },
    {
      email: "person2@naver.com",
      authority: 1,
      profile: "baseUserImg.png",
      nick: "누군가가요",
      password: "rkdans12!",
    },
    {
      email: "person3@naver.com",
      authority: 0,
      profile: "baseUserImg.png",
      nick: "누군가가",
      password: "rkdans12!",
    },
    {
      email: "person4@naver.com",
      authority: 0,
      profile: "baseUserImg.png",
      nick: "누구든지",
      password: "rkdans12!",
    },
    {
      email: "person5@naver.com",
      authority: 0,
      profile: "baseUserImg.png",
      nick: "누가기침소리를",
      password: "rkdans12!",
    },
  ];

  for (let item of data) {
    await UserInfo.create({
      ...item,
      password: mkHash("sha256", item.password),
    });
  }
};
