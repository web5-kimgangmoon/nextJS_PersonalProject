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
  timestamps: true,
})
export default class Like extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => UserInfo)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  userId!: number;

  @ForeignKey(() => Cmt)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  cmtId!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isDislike!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isLike!: boolean;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => UserInfo, "userId")
  user!: UserInfo;

  @BelongsTo(() => Cmt, "cmtId")
  cmt!: Cmt;
}
