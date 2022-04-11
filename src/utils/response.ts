import { Context } from 'koa'

/**
 *
 * @param ctx
 * @param data 返回数据
 * @param msg 信息
 * @param code 状态码
 */
export const success = (ctx: Context, data: any = null, msg = 'success', code = 200) => {
  ctx.body = {
    code,
    data,
    msg,
    success: true,
  }
}

/**
 *
 * @param ctx
 * @param msg 错误提示
 * @param data 扩展提示
 * @param code 状态码
 */
export const error = (ctx: Context, msg: string = 'error', data: any = null, code = 404) => {
  ctx.body = {
    code,
    data,
    msg,
    success: false,
  }
}

export default {
  error,
  success,
}
