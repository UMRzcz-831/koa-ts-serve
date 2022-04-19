import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './User'
import Device from './Device'
@Table
export default class UserDevice extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number
  
  @BelongsTo(() => User)
  user!: User[]

  @ForeignKey(() => Device)
  @Column
  deviceId!: number

  @BelongsTo(() => Device)
  device!: Device[]
}
