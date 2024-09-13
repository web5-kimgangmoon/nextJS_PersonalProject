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
import CategoryRule from "./categoryRuleList";
import Board from "./boards";

@Table({
  tableName: "categories",
  underscored: false,
  timestamps: true,
})
export default class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Board)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: true })
  informId!: number;

  @Column({ type: DataType.STRING(20), allowNull: false, unique: true })
  path!: string;

  @Column({ type: DataType.STRING(20), allowNull: false, unique: true })
  name!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  cmtPlaceholder!: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  titlePlaceholder!: string;

  @Column({ type: DataType.STRING(300), allowNull: false })
  descriptionPlaceholder!: string;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  contentPlaceholder!: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
    defaultValue: "baseCategoryImg.png",
  })
  img!: string;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  description!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @HasMany(() => CategoryRule, "categoryId")
  rules!: CategoryRule[];

  @HasMany(() => Board, "categoryId")
  boards!: Board[];

  @BelongsTo(() => Board, "informId")
  informBoard!: Board;
}
