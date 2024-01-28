import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { User } from "src/modules/user/models/user.model";

@Table
export class Watchlist extends Model {
    @ForeignKey(() => User)
    user: User

    @Column
    name: string

    @Column
    assetId: string
}