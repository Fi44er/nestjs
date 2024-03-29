import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { Watchlist } from "src/modules/watchlist/models/watchlist.model";

@Table
export class User extends Model {
    @Column
    firstName: string

    @Column
    userName: string

    @Column
    password: string

    @Column
    email: string

    @HasMany(() => Watchlist, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    watchlist: Watchlist[]
}