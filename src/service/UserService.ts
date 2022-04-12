import User from '../model/User'
import { IUser } from '../controller/UserController/types/index'

class UserService {
  async getUser() {
    return User.findOne()
  }

  async addUser(admin: IUser) {
    return User.create({ ...admin })
  }

  async updateUser(admin: IUser) {
    User.findOne()
    if (admin.id && admin.id > 0) {
      return User.update(
        { ...admin },
        {
          where: {
            id: admin.id,
          },
        },
      )
    }
  }

  async getUserById(id: number) {
    return User.findByPk(id)
  }
  /**
   * 分页查找用户
   * @param pageNo
   * @param pageSize
   * @returns
   */
  async getPaginatedUserList(pageNo: number = 1, pageSize: number = 10) {
    return User.findAndCountAll({
      limit: pageSize,
      offset: (pageNo - 1) * pageSize,
    })
  }

  /**
   * 根据用户名查询
   * @param username 
   * @returns 
   */
  async getUserByName(username: string) {
    return User.findOne({
      where: {
        username,
      },
    })
  }

  /**
   * 根据手机号查询
   * @param mobile 
   * @returns 
   */
  async getUserByMobile(mobile: string) {
    return User.findOne({
      where: {
        mobile,
      },
    })
  }
}

export default new UserService()
