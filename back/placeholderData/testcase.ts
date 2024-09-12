import sequelize from "../models";
import { createBoardNCategory } from "./categoryNBoard";
import { createCmt } from "./cmts";
import { createLike } from "./like";
import { createReason } from "./reason";
import { createScore } from "./score";
import { createUsers } from "./userInfoList";

export default async () => {
  await sequelize.sync({ force: true });
  await createUsers();
  await createBoardNCategory();
  await createCmt();
  await createLike();
  await createScore();
  await createReason();
  // const s = await UserInfo.create({});
  // const b = await UserInfo.create({ connectId: 1 });
  // await Like.create({ userId: 1 });
  // await s.$set("oauthUsers", [b]);
  // await s.$set("likeAct", []);
  // await s.save();
  //   console.log(());
  // console.log(
  //   (await UserInfo.findOne({ where: { id: 1 }, include: ["oauthUsers"] }))
  //     ?.oauthUsers
  // );
  // console.log(s.oauthUsers);
};
