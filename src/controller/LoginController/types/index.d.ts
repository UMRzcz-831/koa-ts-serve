/**
 * 登录入参
 */
export interface IUser {
  username?: string
  password: string
  mobile?: string
  type: LoginType
}

// 1: 手机号、密码登录 | 0: 用户名、密码登录
export type LoginType = 1 | 0
