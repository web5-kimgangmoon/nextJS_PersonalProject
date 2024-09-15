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

@Table({
  tableName: "adminActLog",
  timestamps: true,
})
export default class AdminAct extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => UserInfo)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  userId!: number;

  @Column({ type: DataType.STRING(15), allowNull: false })
  action!: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  log!: string;

  @Column({ type: DataType.STRING(50) })
  logDetail!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => UserInfo, "userId")
  user!: UserInfo;
}
