import { Context } from 'koa'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { isArray } from 'lodash'
import Response from '../../utils/response'
import { qiniuUpload } from '../../utils/qiniu'

class FileUploadController {
  async upload(ctx: Context) {
    const file = ctx.request.files?.file
    // 创建文件可读流
    if (!isArray(file)) {
      if (file) {
        const fileName = uuidv4()
        const reader = fs.createReadStream(file.path)
        // 获取上传文件扩展名
        const ext = file?.name?.split?.('.').pop()
        // 命名文件以及拓展名
        const fileUrl = `remote/${fileName}.${ext}`
        try {
          const result = (await qiniuUpload(reader, fileUrl)) as any
          return Response.success(
            ctx,
            { ...result, url: `https://photos.umr831.com/${result.key}` },
            '上传成功',
          )
        } catch (error) {
          return Response.error(ctx, `七牛上传出错: ${error}`)
        }
      } else {
        return Response.error(ctx, 'file不能为空')
      }
    } else {
      return Response.error(ctx, '暂不支持多文件上传')
    }
  }
}

export default new FileUploadController()
