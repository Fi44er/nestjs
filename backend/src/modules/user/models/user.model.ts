import { Column, Table, Model } from "sequelize-typescript";

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
}