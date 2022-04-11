import {Column, Model, Table} from 'sequelize-typescript'

@Table
export default class User extends Model {

    @Column
    username!: string
    @Column
    password!: string
    @Column
    mobile?: string
}