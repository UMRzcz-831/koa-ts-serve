import { Column, Model, Table, ForeignKey } from 'sequelize-typescript'
import { ThemeName } from '../config/constant'
import User from './User'

@Table
export default class Preference extends Model {

  @ForeignKey(() => User)
  @Column
  userId!: number

  @Column
  nickname!: string
  @Column
  avatarUrl!: string
  @Column
  theme!: string // 主题 0-light 1-dark
  @Column
  get themeName(): string {
    return ThemeName[this.getDataValue('theme')]
  }
}
