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
import Board from "./boards";
import Reason from "./reasons";

@Table({
  tableName: "reportHistory",
  underscored: false,
  timestamps: true,
})
export default class Report extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => UserInfo)
  @Column(DataType.INTEGER.UNSIGNED)
  reporterId!: number;

  @ForeignKey(() => Cmt)
  @Column(DataType.INTEGER.UNSIGNED)
  cmtId!: number;

  @ForeignKey(() => Board)
  @Column(DataType.INTEGER.UNSIGNED)
  boardId!: number;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @ForeignKey(() => Reason)
  @Column(DataType.INTEGER.UNSIGNED)
  reasonId!: number;

  @BelongsTo(() => UserInfo, "reporterId")
  reporter!: UserInfo;

  @BelongsTo(() => Cmt, "cmtId")
  reportedCmt!: Cmt;

  @BelongsTo(() => Board, "boardId")
  reportedBoard!: Board;

  @BelongsTo(() => Reason, "reasonId")
  reason!: Reason;
}
