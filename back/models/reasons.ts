import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import UserInfo from "./userInfoList";
import Board from "./boards";
import Cmt from "./cmts";
import BanItem from "./banHistory";

@Table({
  tableName: "reasons",
})
export default class Reason extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column({ type: DataType.STRING(20), allowNull: false })
  title!: number;

  @Column({ type: DataType.STRING(100) })
  description!: number;

  @Column({ type: DataType.STRING(15), allowNull: false })
  reasonType!: number;

  @HasMany(() => Board, "deleteReasonId")
  Boards!: Board[];

  @HasMany(() => Cmt, "deleteReasonId")
  cmts!: Cmt[];

  @HasMany(() => BanItem, "reasonId")
  banList?: BanItem[];
}
