import jwt from 'jsonwebtoken'
import { config } from '../config/index'

export const sign = (data: any) => {
  return jwt.sign({ user: data }, config.jwt.jwt_secret, {
    expiresIn: 60 * 60 * 24,
  })
}

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.jwt_secret)
    return {
      user: decoded,
      error: null,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
