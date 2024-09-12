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
import Like from "./likeList";
import Board from "./boards";
import Cmt from "./cmts";
import Score from "./scoreList";
import AdminAct from "./adminActLog";
import BanItem from "./banHistory";

@Table({
  tableName: "userInfoList",
  underscored: false,
  timestamps: true,
})
export default class UserInfo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @ForeignKey(() => UserInfo)
  @Column(DataType.INTEGER.UNSIGNED)
  connectId!: number;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING(20) })
  oauth!: string;

  @Column({ type: DataType.TINYINT(), defaultValue: 0 })
  authority!: number;

  @Column({ type: DataType.STRING(100), defaultValue: "baseUserImg.png" })
  profileImg!: string;

  @Column({ type: DataType.STRING(20), allowNull: false, unique: true })
  nick!: string;

  @Column({ type: DataType.STRING(300), allowNull: false })
  password!: string;

  @Column({ type: DataType.DATE })
  deletedAt!: Date;

  @BelongsTo(() => UserInfo, "connectId")
  baseUser!: UserInfo;

  @HasMany(() => UserInfo, "connectId")
  oauthUsers!: UserInfo[];

  @HasMany(() => Like, "userId")
  doLikeActs!: Like[];

  @HasMany(() => Board, "writerId")
  writtenBoards!: Board[];

  @HasMany(() => Cmt, "writerId")
  writtenCmts!: Cmt;

  @HasMany(() => Score, "userId")
  doScore!: Score[];

  @HasMany(() => AdminAct, "userId")
  doAdminActs!: AdminAct[];

  @HasMany(() => BanItem, "userId")
  banList!: BanItem[];
}
