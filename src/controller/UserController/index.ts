import { IUser } from './types/index.d'
import { Context } from 'koa'
import { logger } from '../../middlewares/log4j'
import UserService from '../../service/UserService'
import Response, { success, error } from '../../utils/response'
import { paginate } from '../../utils/paginate'
import { isNaN } from 'lodash'
import validate from '../../utils/validate'
import { CREATE_USER_RULE } from './constant/index'
import { createHash } from 'crypto'

class UserController {
  async getPaginatedUserList(ctx: Context) {
    const params = new URLSearchParams(ctx.querystring)
    let pageNo = 1,
      pageSize = 10
    if (params.get('pageNo')) {
      const n = Number(params.get('pageNo'))
      if (isNaN(n)) {
        error(ctx, 'pageNo 参数错误')
        return
      }
      pageNo = n
    }
    if (params.get('pageSize')) {
      const n = Number(params.get('pageSize'))
      if (isNaN(n)) {
        error(ctx, 'pageSize 参数错误')
        return
      }
      pageSize = n
    }
    const { rows, count } = await UserService.getPaginatedUserList(pageNo, pageSize)
    success(ctx, paginate(rows, pageNo, count, pageSize))
  }

  async getUserById(ctx: Context) {
    const user = await UserService.getUserById(3)
    if (user) {
      success(ctx, { user })
    } else {
      error(ctx, '用户不存在!')
      logger.info('查表', `id为${2}用户不存在`)
    }
    // ctx.body = user
  }

  async createUser(ctx: Context) {
    const { data, error } = await validate<IUser>(ctx, CREATE_USER_RULE)
    if (error) {
      return Response.error(ctx, error)
    }
    const user = await UserService.getUserByName(data.username)
    if (user) {
      return Response.error(ctx, '用户已存在')
    }
    data.password = createHash('md5').update(data.password).digest('hex')
    const row = await UserService.addUser(data)
    if (row.id > 0) {
      return Response.success(ctx)
    }
    return Response.error(ctx, '用户新增失败')
    // ctx.body = user
  }
}

export default new UserController()
