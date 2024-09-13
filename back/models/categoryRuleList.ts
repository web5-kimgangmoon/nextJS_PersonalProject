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
import Category from "./categories";

@Table({
  tableName: "categoryRuleList",
  underscored: false,
  timestamps: true,
})
export default class CategoryRule extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER.UNSIGNED)
  categoryId!: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  description!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;
}
