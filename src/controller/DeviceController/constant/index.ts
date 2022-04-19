import { Rules } from 'async-validator'
export const BIND_DEVICE_RULE: Rules = {
  hostname: [
    {
      type: 'string',
      required: true,
      message: 'hostname不可为空',
    },
  ],
  alias: [
    {
      type: 'string',
      required: false,
      message: 'alias类型为string',
    },
  ],
  osPlatform: [
    {
      type: 'string',
      required: true,
      message: 'osPlatform不可为空',
    },
  ],
  osVersion: [
    {
      type: 'string',
      required: true,
      message: 'osVersion不可为空',
    },
  ],
  osAdmin:[
    {
      type: 'string',
      required: true,
      message: 'osAdmin不可为空',
    },
  ]
}

export const UPDATE_PREFERENCE_RULE: Rules = {
  nickname: [
    {
      type: 'string',
      required: false,
      message: 'nickname应为string类型',
    },
    {
      type: 'string',
      max: 30,
      message: '昵称长度不大于30',
    },
  ],
  avatarUrl: [{ type: 'string', required: false, message: 'avatarUrl应为string' }],
  theme: [
    {
      type: 'string',
      required: false,
      message: 'theme应为string',
    },
  ],
}
