import { Context } from 'koa'
import UserService from '../../service/UserService'
import { sign } from '../../utils/auth'
import validate from '../../utils/validate'
import Response from '../../utils/response'
import { LOGIN_USER_RULE } from './constant'
import { IUser } from './types'
import { compareSync } from 'bcrypt'
import { logger } from '../../middlewares/log4j'

class LoginController {
  /**
   * 登录接口
   * @param ctx
   * @returns
   */
  async index(ctx: Context) {
    const { data, error: err } = await validate<IUser>(ctx, LOGIN_USER_RULE)
    console.log(data, err)
    if (err) {
      return Response.error(ctx, err)
    }
    let user
    // 根据 type 决定查询用户的依据
    if (data.type === 0) {
      if (data.username) {
        user = await UserService.getUserByName(data.username)
      } else {
        return Response.error(ctx, '用户名未填写')
      }
    } else {
      if (data.mobile) {
        user = await UserService.getUserByMobile(data.mobile)
      } else {
        return Response.error(ctx, '手机号未填写')
      }
    }
    logger.info('获取用户', user?.get())
    // user 不存在  或者 密码不正确 返回错误
    if (user) {
      const isValid = compareSync(data.password, user.getDataValue('password'))
      if (!isValid) {
        logger.error('密码错误')
        return Response.error(ctx, '密码错误')
      }
      const token = sign(user)
      return Response.success(ctx, { token })
    } else {
      logger.error('登录失败', '用户不存在')
      return Response.error(ctx, '用户不存在')
    }
  }
}

export default new LoginController()
