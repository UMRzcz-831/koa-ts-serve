import jwt from 'jsonwebtoken'
import { config } from '../config/index'
import { IUser } from '../controller/UserController/types'

type decodedData={
  user: Required<IUser>
}

export const sign = (data: any) => {
  return jwt.sign({ user: data }, config.jwt.jwt_secret, {
    expiresIn: 60 * 60 * 24,
  })
}

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.jwt_secret) as decodedData
    return {
      data: decoded,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
