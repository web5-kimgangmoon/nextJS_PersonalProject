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
import Board from "./boards";

@Table({
  tableName: "scoreList",
  underscored: false,
  timestamps: true,
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

  @Column({
    type: DataType.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 1,
  })
  score!: number;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => Board, "boardId")
  board!: Board;

  @BelongsTo(() => UserInfo, "userId")
  doUser!: UserInfo;
}
