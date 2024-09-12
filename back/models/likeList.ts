import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import UserInfo from "./userInfoList";
import Cmt from "./cmts";

@Table({
  tableName: "likeList",
  underscored: false,
})
export default class Like extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => UserInfo)
  @Column(DataType.INTEGER.UNSIGNED)
  userId?: number;

  @ForeignKey(() => Cmt)
  @Column(DataType.INTEGER.UNSIGNED)
  cmtId?: number;

  @Column(DataType.BOOLEAN)
  isDisLike?: number;

  @Column(DataType.BOOLEAN)
  isLike?: number;

  @BelongsTo(() => UserInfo, "userId")
  user?: UserInfo;

  @BelongsTo(() => Cmt, "cmtId")
  cmt?: Cmt;
}
