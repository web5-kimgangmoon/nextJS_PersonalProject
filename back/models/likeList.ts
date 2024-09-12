import {
  AutoIncrement,
  BelongsTo,
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
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  userId?: number;

  @ForeignKey(() => Cmt)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  cmtId?: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isDisLike?: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isLike?: number;

  @BelongsTo(() => UserInfo, "userId")
  user?: UserInfo;

  @BelongsTo(() => Cmt, "cmtId")
  cmt?: Cmt;
}
