import { Context } from 'koa'
import validate from '../../utils/validate'
import Response from '../../utils/response'
import { IPreference } from './types'
import { CREATE_PREFERENCE_RULE, UPDATE_PREFERENCE_RULE } from './constant/index'
import UserService from '../../service/UserService'
import PreferenceService from '../../service/PreferenceService'
import { verify } from '../../utils/auth'

class PreferenceController {
  async CreatePreference(ctx: Context) {
    const { data, error: err } = await validate<IPreference>(ctx, CREATE_PREFERENCE_RULE)
    console.log(data, err)
    if (err) {
      return Response.error(ctx, err)
    }
    const user = await UserService.getUserById(data.userId)

    // user 不存在
    if (user) {
      const row = await PreferenceService.addPreference(data)
      if (row.id > 0) {
        return Response.success(ctx)
      }
      return Response.error(ctx, '用户新增失败')
    } else {
      return Response.error(ctx, '用户不存在')
    }
  }

  async GetPreferenceByUserId(ctx: Context) {
    const { authorization = '' } = ctx.headers
    const { data, error } = verify(authorization)
    if (!data || error) {
      return Response.error(ctx, 'token验证失败')
    }
    const { id: userId } = data.user

    const row = await PreferenceService.queryPreferenceByUserId(userId)
    if (row) {
      Response.success(ctx, row)
    } else {
      Response.error(ctx, '偏好查询失败!')
    }
  }
  async UpdatePreferenceByUserId(ctx: Context) {
    const { authorization = '' } = ctx.headers
    const { data, error } = verify(authorization)
    if (!data || error) {
      return Response.error(ctx, 'token验证失败')
    }
    const { id: userId } = data.user
    if (userId) {
      const { data, error: err } = await validate<IPreference>(ctx, UPDATE_PREFERENCE_RULE)
      if (err) {
        return Response.error(ctx, err)
      }
      const row = await PreferenceService.updatePreferenceByUserId({ ...data, userId })
      if (row) {
        return Response.success(ctx)
      } else {
        return Response.error(ctx, '偏好更新失败!')
      }
    }
    return Response.error(ctx, '用户不存在')
  }
}

export default new PreferenceController()
