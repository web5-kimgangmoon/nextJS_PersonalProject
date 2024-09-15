import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Board from "./boards";
import Cmt from "./cmts";
import BanItem from "./banHistory";

@Table({
  tableName: "reasons",
  timestamps: true,
})
export default class Reason extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column({ type: DataType.STRING(20), allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING(100) })
  description!: string;

  @Column({ type: DataType.STRING(15), allowNull: false })
  reasonType!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @HasMany(() => Board, "deleteReasonId")
  Boards!: Board[];

  @HasMany(() => Cmt, "deleteReasonId")
  cmts!: Cmt[];

  @HasMany(() => BanItem, "reasonId")
  banList!: BanItem[];
}
