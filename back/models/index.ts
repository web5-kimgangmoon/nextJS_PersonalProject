import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import UserInfo from "./userInfoList";
import Like from "./likeList";
import BanItem from "./banHistory";
import AdminAct from "./adminActLog";
import Board from "./boards";
import Category from "./categories";
import CategoryRule from "./categoryRuleList";
import Cmt from "./cmts";
import Reason from "./reasons";
import Score from "./scoreList";
import Report from "./reportHistory";
config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: `${process.env.EC2_HOST}`,
  username: `${process.env.EC2_MYSQL_USER}`,
  password: `${process.env.EC2_MYSQL_PASSWORD}`,
  database: `${process.env.EC2_MYSQL_DATABASE}`,
  port: 3308,
  logging: console.log,
  models: [
    UserInfo,
    Reason,
    Category,
    Board,
    CategoryRule,
    Like,
    BanItem,
    AdminAct,
    Cmt,
    Score,
    Report,
  ],
});

export default sequelize;
