import { Column, Model, Table, BelongsToMany, Scopes, ForeignKey } from 'sequelize-typescript'
import User from './User'
import UserDevice from './UserDevice'

@Scopes(() => ({
  users: {
    include: [
      {
        model: User,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table
export default class Device extends Model {
  @BelongsToMany(() => User, () => UserDevice)
  users!: User[]

  @Column
  hostname!: string

  @Column
  alias?: string

  @Column
  osPlatform!: string

  @Column
  osVersion!: string

  @Column
  osAdmin!: string

  @Column
  ip!: string
}
