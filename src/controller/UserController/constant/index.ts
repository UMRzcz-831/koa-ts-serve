import { Rules } from 'async-validator'
import { MOBILE_PHONE } from '../../../utils/regex'
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
    { type: 'string', required: true, message: '请输入手机号' },
    { type: 'string', pattern: MOBILE_PHONE, message: '手机号不正确' },
  ],
}
