import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Like from "./likeList";
import UserInfo from "./userInfoList";
import Board from "./boards";
import Reason from "./reasons";

@Table({
  tableName: "cmts",
  underscored: false,
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

  @BelongsTo(() => Board, "boardId")
  board!: Board;

  @HasMany(() => Cmt, "replyId")
  replyCmtTo!: Cmt;

  @BelongsTo(() => Cmt, "replyId")
  replyCmtsFrom!: Cmt[];

  @BelongsTo(() => UserInfo, "writerId")
  writer!: UserInfo;

  @BelongsTo(() => Reason, "deleteReasonId")
  deleteReason!: Reason;

  @HasMany(() => Like, "cmtId")
  likeList?: Like[];
}
