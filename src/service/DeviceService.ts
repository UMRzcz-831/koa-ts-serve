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

  async queryDeviceByUserId(userId: number) {
    return await UserDevice.findAll({
      where: { userId },
      include: [
        {
          model: Device,
          attributes: ['hostname', 'alias', 'osPlatform', 'osVersion', 'osAdmin', 'ip'],
        },
      ],
    })
  }
}

export default new DeviceService()
