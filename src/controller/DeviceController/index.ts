import { Context } from 'koa'
import validate from '../../utils/validate'
import Response from '../../utils/response'
import { IDevice } from './types'
import { verify } from '../../utils/auth'
import { BIND_DEVICE_RULE } from './constant/index'
import DeviceService from '../../service/DeviceService'

class DeviceController {
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
    const row = await DeviceService.bindDevice({ ...deviceData, ip }, userId)
    if (row.getDataValue('userId') > 0) {
      return Response.success(ctx, row, '绑定成功')
    } else {
      return Response.error(ctx, '绑定失败')
    }
  }

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
}

export default new DeviceController()
