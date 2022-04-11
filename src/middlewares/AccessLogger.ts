import { Context, Next } from 'koa'
import { accessLogger } from './log4j'

function AccessLogger(ctx: Context, next: Next) {
  const logStr = `path:${ctx.path} | method:${ctx.method} | ua: ${ctx.headers['user-agent']}`
  accessLogger.info(logStr)
  return next()
}

export default AccessLogger
