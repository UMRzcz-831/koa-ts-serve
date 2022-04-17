import { Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Preference from './Preference'

@Table
export default class User extends Model {
  @ForeignKey(() => Preference)
  @Column
  preferenceId!: number

  @BelongsTo(() => Preference)
  preferenceInfo!: Preference
  @Column
  username!: string
  @Column
  password!: string
  @Column
  mobile?: string
}
