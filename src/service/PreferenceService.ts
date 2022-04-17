import { IPreference } from '../controller/PreferenceController/types'
import Preference from '../model/Preference'

class PreferenceService {
  async addPreference(val: IPreference) {
    return Preference.create({ ...val })
  }

  async updatePreferenceByUserId(val: IPreference) {
    return Preference.update(val, {
      where: {
        userId: val.userId,
      },
    })
  }

  async queryPreferenceByUserId(id: number) {
    return Preference.findOne({
      where: {
        userId: id,
      },
    })
  }
}

export default new PreferenceService()
