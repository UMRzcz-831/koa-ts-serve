import { Column, Model, Table, BelongsToMany, Scopes } from 'sequelize-typescript'
import moment from 'moment'
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

  @Column
  get bindAt(): string {
    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
  }

  @Column
  get lastConnectedAt(): string {
    return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
  }
}
