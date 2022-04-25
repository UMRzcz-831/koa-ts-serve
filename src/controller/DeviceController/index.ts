import { Context } from 'koa'
import validate from '../../utils/validate'
import Response from '../../utils/response'
import { IDevice } from './types'
import { verify } from '../../utils/auth'
import { BIND_DEVICE_RULE } from './constant/index'
import DeviceService from '../../service/DeviceService'

class DeviceController {
  /**
   * 绑定设备
   * @param ctx
   * @returns
   */
  async BindDevice(ctx: Context) {
    const { ip = '' } = ctx.request
    const { authorization = '' } = ctx.headers
    const { data, error } = verify(authorization)
    if (!data || error) {
      return Response.error(ctx, 'token验证失败')
    }
    const { id: userId } = data.user
    const { data: deviceData, error: deviceError } = await validate<IDevice>(ctx, BIND_DEVICE_RULE)
    if (deviceError) {
      return Response.error(ctx, deviceError)
    }
    const hasOne = await DeviceService.queryDeviceByMultipe(deviceData)
    if (hasOne) {
      const hasUser = await DeviceService.queryUserDeviceBinding(userId, hasOne.id)
      if (hasUser) {
        if (hasUser.getDataValue('id')) {
          return Response.error(ctx, '用户已绑定该设备')
        }
      } else {
        const row = await DeviceService.bindExistDevice(userId, hasOne.id)
        if (row.getDataValue('userId') > 0) {
          return Response.success(ctx, row, '绑定成功')
        } else {
          return Response.error(ctx, '绑定失败')
        }
      }
    }
    const row = await DeviceService.bindDevice({ ...deviceData, ip }, userId)
    if (row.getDataValue('userId') > 0) {
      return Response.success(ctx, row, '绑定新设备成功')
    } else {
      return Response.error(ctx, '绑定失败')
    }
  }

  /**
   * 查询设备列表
   * @param ctx
   * @returns
   */
  async QueryDeviceByUserId(ctx: Context) {
    const { authorization = '' } = ctx.headers
    const { data, error } = verify(authorization)
    if (!data || error) {
      return Response.error(ctx, 'token验证失败')
    }
    const { id: userId } = data.user
    const list = await DeviceService.queryDeviceByUserId(userId)
    return Response.success(ctx, list)
  }

  /**
   * 查询设备详情
   * @param ctx
   * @returns
   */
  async QueryDeviceByDeviceId(ctx: Context) {
    const deviceId = Number(ctx.params.deviceId)
    if (isNaN(deviceId)) {
      return Response.error(ctx, 'deviceId 参数错误')
    }
    const row = await DeviceService.queryDevice(deviceId)
    if (row) {
      return Response.success(ctx, row)
    } else {
      return Response.error(ctx, '设备不存在')
    }
  }

  /**
   * 更新设备信息
   * @param ctx
   * @returns
   */
  async UpdateDevice(ctx: Context) {
    const { ip = '' } = ctx.request
    const deviceId = Number(ctx.params.deviceId)
    if (isNaN(deviceId)) {
      return Response.error(ctx, 'deviceId 参数错误')
    }

    const { data: deviceData, error: deviceError } = await validate<IDevice>(ctx, BIND_DEVICE_RULE)
    if (deviceError) {
      return Response.error(ctx, deviceError)
    }
    const row = await DeviceService.updateDevice(deviceId, { ...deviceData, ip })
    if (row) {
      return Response.success(ctx, row, '更新成功')
    } else {
      return Response.error(ctx, '更新失败')
    }
  }

  /**
   * 解绑设备
   * @param ctx
   * @returns
   */
  async UnbindDevice(ctx: Context) {
    const { authorization = '' } = ctx.headers
    const { data, error } = verify(authorization)
    if (!data || error) {
      return Response.error(ctx, 'token验证失败')
    }
    const { id: userId } = data.user

    const deviceId = Number(ctx.params.deviceId)
    if (isNaN(deviceId)) {
      return Response.error(ctx, 'deviceId 参数错误')
    }

    const row = await DeviceService.unbindDevice(deviceId, userId)
    if (row) {
      return Response.success(ctx, row, '解绑成功')
    } else {
      return Response.error(ctx, '解绑失败')
    }
  }
}

export default new DeviceController()
