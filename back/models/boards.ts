import {
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
} from "sequelize-typescript";
import Like from "./likeList";
import UserInfo from "./userInfoList";
import Category from "./categories";
import Reason from "./reasons";
import Cmt from "./cmts";
import Score from "./scoreList";

@Table({
  tableName: "boards",
  underscored: false,
})
export default class Board extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  categoryId!: number;

  @ForeignKey(() => UserInfo)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  writerId!: number;

  @ForeignKey(() => Reason)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  deleteReasonId!: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  title!: number;

  @Column({ type: DataType.STRING(300), allowNull: false })
  img!: number;

  @Column({ type: DataType.STRING(3000), allowNull: false })
  content!: number;

  @Column({ type: DataType.STRING(300), allowNull: false })
  description!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  looks!: number;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;

  @HasMany(() => Category, "informId")
  onInformCategory!: Category[];

  @BelongsTo(() => UserInfo, "writerId")
  writer!: UserInfo;

  @BelongsTo(() => Reason, "deleteReasonId")
  deleteReason!: Reason;

  @HasMany(() => Cmt, "boardId")
  cmts!: Cmt[];

  @HasMany(() => Score, "boardId")
  scores!: Score[];
}
