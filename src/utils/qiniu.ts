import qiniu from 'qiniu'
import { config } from '../config'

export const qiniuUpload = async (filePath: any, key: string) => {
  const mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey)
  const putPolicy = new qiniu.rs.PutPolicy({ scope: config.qiniu.bucket })
  const uploadToken = putPolicy.uploadToken(mac)
  // zone 华东机房  zone1 华北机房  zone2 华南机房   zoneNa0 北美
  const storeConfig = new qiniu.conf.Config({
    zone: qiniu.zone.Zone_z0,
  })
  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(storeConfig)
  const putExtra = new qiniu.form_up.PutExtra()
  return new Promise((resolve, reject) => {
    formUploader.putStream(uploadToken, key, localFile, putExtra, (err, res, respInfo) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
