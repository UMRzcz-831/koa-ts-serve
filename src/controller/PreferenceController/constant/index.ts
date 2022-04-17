import { Rules } from 'async-validator'
export const CREATE_PREFERENCE_RULE: Rules = {
  userId: [
    {
      type: 'number',
      required: true,
      message: 'userId不可为空',
    },
  ],
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
