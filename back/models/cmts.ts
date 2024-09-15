import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Like from "./likeList";
import UserInfo from "./userInfoList";
import Board from "./boards";
import Reason from "./reasons";
import Report from "./reportHistory";

@Table({
  tableName: "cmts",
  underscored: false,
  timestamps: true,
})
export default class Cmt extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Board)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  boardId!: number;

  @ForeignKey(() => Cmt)
  @Column(DataType.INTEGER.UNSIGNED)
  replyId!: number;

  @ForeignKey(() => UserInfo)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  writerId!: number;

  @ForeignKey(() => Reason)
  @Column(DataType.INTEGER.UNSIGNED)
  deleteReasonId!: number;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  content!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => Board, "boardId")
  board!: Board;

  @BelongsTo(() => Cmt, "replyId")
  replyCmtTo!: Cmt;

  @HasMany(() => Cmt, "replyId")
  replyCmtsFrom!: Cmt[];

  @BelongsTo(() => UserInfo, "writerId")
  writer!: UserInfo;

  @BelongsTo(() => Reason, "deleteReasonId")
  deleteReason!: Reason;

  @HasMany(() => Like, "cmtId")
  likeList!: Like[];

  @HasMany(() => Report, "cmtId")
  reports!: Report[];
}
