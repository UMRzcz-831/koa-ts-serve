import { Rules } from 'async-validator'
export const CREATE_USER_RULE: Rules = {
  username: [
    {
      type: 'string',
      required: true,
      message: '用户名不可为空',
    },
    {
      type: 'string',
      min: 4,
      message: '用户名长度不小于4',
    },
    {
      type: 'string',
      max: 10,
      message: '用户名长度不大于10',
    },
  ],
  password: [
    {
      type: 'string',
      required: true,
      message: '密码不可为空',
    },
    {
      type: 'string',
      min: 6,
      message: '密码长度不小于6',
    },
    {
      type: 'string',
      max: 20,
      message: '密码长度不大于20',
    },
  ],
}
