import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Context, Next } from 'koa'
import { verify } from '../utils/auth'

function AuthMiddleware(ctx: Context, next: Next) {
  const token = ctx.headers['authorization']
  if (token) {
    const { error } = verify(token)
    if (error) {
      const { message } = error as JsonWebTokenError | TokenExpiredError
      ctx.body = {
        msg: message,
        code: 401,
        success: false,
      }
      return
    }
    return next()
  }
  ctx.body = {
    msg: 'authorization 不可为空',
    code: 401,
    success: false,
  }
  return
}

export default AuthMiddleware
