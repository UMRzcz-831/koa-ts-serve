// import { IPreference } from '../controller/PreferenceController/types'
// import Preference from '../model/Preference'
import Device from '../model/Device'
import UserDevice from '../model/UserDevice'

interface IDevice {
  hostname: string
  alias: string
  osPlatform: string
  osVersion: string
  osAdmin: string
  ip: string
}

class DeviceService {
  async bindDevice(val: IDevice, userId: number) {
    const row = await Device.create({ ...val })
    if (row.id > 0) {
      return await UserDevice.create({ userId, deviceId: row.id })
    } else {
      return row
    }
  }

  async bindExistDevice(userId: number, deviceId: number) {
    return await UserDevice.create({ userId, deviceId })
  }

  // 查询用户绑定的设备
  async queryDeviceByUserId(userId: number) {
    return await UserDevice.findAll({
      where: { userId },
      include: [
        {
          model: Device,
          attributes: ['hostname', 'alias'],
        },
      ],
    })
  }

  async queryDeviceByMultipe(val: IDevice) {
    return await Device.findOne({
      where: {
        hostname: val.hostname,
        osPlatform: val.osPlatform,
        osVersion: val.osVersion,
        osAdmin: val.osAdmin,
      },
    })
  }

  async queryUserDeviceBinding(userId: number, deviceId: number) {
    return await UserDevice.findOne({
      where: { userId, deviceId },
    })
  }

  async queryDevice(deviceId: number) {
    return await Device.findOne({
      where: { id: deviceId },
    })
  }

  async updateDevice(deviceId: number, val: IDevice) {
    return await Device.update(val, { where: { id: deviceId } })
  }

  // 解绑设备
  async unbindDevice(deviceId: number, userId: number) {
    return await UserDevice.destroy({ where: { deviceId, userId } })
  }
}

export default new DeviceService()
