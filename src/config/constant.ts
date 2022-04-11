import path from 'path'


export const PORT = 6200


export const LogPath = path.resolve(__dirname, '../../logs/')

export const JwtWhileList = [
  /\/v1\/oauth2\/authorize/,
  /\/v1\/oauth2\/token/,
  /\/oauth2\/auth/,
  /\/user\/login/,
  /docs/,
]
