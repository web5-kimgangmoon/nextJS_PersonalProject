import sequelize from "../models";
import Like from "../models/likeList";
import UserInfo from "../models/userInfoList";

export default async () => {
  await sequelize.sync({ alter: true, force: true });
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
