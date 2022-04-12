import { Rules } from 'async-validator'
import { MOBILE_PHONE } from '../../../utils/regex'
export const LOGIN_USER_RULE: Rules = {
  username: [
    {
      type: 'string',
      required: false,
      message: '用户名类型应为string',
    },
    {
      type: 'string',
      min: 4,
      message: '用户名长度不小于4',
    },
    {
      type: 'string',
      max: 20,
      message: '用户名长度不大于20',
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
      max: 32,
      message: '密码长度不大于32',
    },
  ],
  mobile: [
    { type: 'string', required: false, message: '手机号应为string' },
    { type: 'string', pattern: MOBILE_PHONE, message: '手机号不正确' },
  ],
  type: [
    { required: true, message: '请传入登录类型' },
    {
      type: 'enum',
      enum: [0, 1],
      message: '登录类型不合法',
    },
  ],
}
