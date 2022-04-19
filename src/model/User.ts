import { Column, Model, Table, BelongsTo, ForeignKey,Scopes, BelongsToMany } from 'sequelize-typescript'
import Preference from './Preference'
import Device from './Device'
import UserDevice from './UserDevice'

@Scopes(() => ({
  devices: {
    include: [
      {
        model: Device,
        through: { attributes: [] },
      },
    ],
  },
}))

@Table
export default class User extends Model {
  @ForeignKey(() => Preference)
  @Column
  preferenceId!: number

  @BelongsTo(() => Preference)
  preferenceInfo!: Preference

  @BelongsToMany(() => Device, () => UserDevice)
  devices!: Device[]

  @Column
  username!: string
  @Column
  password!: string
  @Column
  mobile?: string
}
