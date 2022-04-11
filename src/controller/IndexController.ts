import { Context } from 'koa'
import { logger } from '../middlewares/log4j'
import UserService from '../service/UserService'
import { success, error } from '../utils/response'

class IndexController {
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

  // async createUser(ctx: Context) {
  //   const user = await UserService.addUser({})
  //   ctx.body = user
  // }
}

export default new IndexController()
