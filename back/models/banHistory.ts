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
import Reason from "./reasons";

@Table({
  tableName: "banHistory",
  timestamps: true,
})
export default class BanItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => UserInfo)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  userId!: number;

  @ForeignKey(() => Reason)
  @Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
  reasonId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  banCnt!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  willBanEndAt!: Date;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => UserInfo, "userId")
  bannedUser!: UserInfo;

  @BelongsTo(() => Reason, "reasonId")
  reason!: Reason;
}
