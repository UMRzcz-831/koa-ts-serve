import { Context, Next } from 'koa'
import { configure, getLogger } from 'log4js'
import fs from 'fs'
import path from 'path'
import { LogPath } from '../config/constant'

// 这个是判断是否有logs目录，没有就新建，用来存放日志
const logsDir = path.resolve(LogPath)
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// 配置log4.js
configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: `${LogPath}/date.log`,
      pattern: '-yyyy-MM-dd',
    },
    access: {
      type: 'file',
      filename: `${LogPath}/access.log`,
    },
  },
  categories: {
    access: {
      appenders: ['access'],
      level: 'info',
    },
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info',
    },
    
  },
})

export const accessLogger = getLogger('[access]')

export const logger = getLogger('[Default]')

// logger中间件
export const loggerMiddleware = async (ctx: Context, next: Next) => {
  // 请求开始时间
  const start = +new Date()
  await next()
  // 结束时间
  const ms = +new Date() - start
  // 打印出请求相关参数
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
  const logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(
    ctx.request.body,
  )}  响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}
