import { Rules } from 'async-validator'
import { Context } from 'koa'
import UserService from '../service/UserService'
import { sign } from '../utils/auth'
import validate from '../utils/validate'
import Response from '../utils/response'

class LoginController {
  async index(ctx: Context) {
    const rules: Rules = {
      username: [
        {
          type: 'string',
          required: true,
          message: '用户名不得为空',
        },
      ],
      password: [
        {
          type: 'string',
          required: true,
          message: '密码不得为空',
        },
      ],
    }

    interface IUser {
      username: string
      password: string
    }

    const { data, error: err } = await validate<IUser>(ctx, rules)
    console.log(data, err)
    if (err) {
      return Response.error(ctx, err)
    }
    const user = await UserService.getUserByName(data.username)
    if (user) {      
      const token = sign(user)
      Response.success(ctx, { token })
    } else {
      Response.error(ctx, '用户不存在')
    }
  }
}

export default new LoginController()
