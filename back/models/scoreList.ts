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

@Table({
  tableName: "scoreList",
  underscored: false,
})
export default class Score extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Board)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  boardId!: number;

  @ForeignKey(() => UserInfo)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  userId!: number;

  @Column({ type: DataType.FLOAT.UNSIGNED, allowNull: false, defaultValue: 1 })
  score!: number;

  @BelongsTo(() => Board, "boardId")
  board!: Board;

  @BelongsTo(() => UserInfo, "userId")
  doUser!: UserInfo;
}
