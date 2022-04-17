import { Context } from 'koa'
import validate from '../../utils/validate'
import Response from '../../utils/response'
import { IPreference } from './types'
import { CREATE_PREFERENCE_RULE, UPDATE_PREFERENCE_RULE } from './constant/index'
import UserService from '../../service/UserService'
import PreferenceService from '../../service/PreferenceService'

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
    const id = Number(ctx.params.id)
    if (isNaN(id)) {
      Response.error(ctx, 'id 参数错误')
      return
    }
    const row = await PreferenceService.queryPreferenceByUserId(id)
    if (row) {
      Response.success(ctx, row)
    } else {
      Response.error(ctx, '偏好查询失败!')
    }
  }
  async UpdatePreferenceByUserId(ctx: Context) {
    const id = Number(ctx.params.id)
    if (isNaN(id)) {
      Response.error(ctx, 'id 参数错误')
      return
    }
    const user = await UserService.getUserById(id)
    if (user) {
      const { data, error: err } = await validate<IPreference>(ctx, UPDATE_PREFERENCE_RULE)
      if (err) {
        return Response.error(ctx, err)
      }
      const row = await PreferenceService.updatePreferenceByUserId({ ...data, userId: id })
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
