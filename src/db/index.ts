import { Sequelize } from 'sequelize-typescript'
import { join } from 'path'
import { config } from '../config'

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: 3306,
  dialect: 'mysql',
  models: [join(__dirname, '..', 'model/**/*.ts'), join(__dirname, '..', 'model/**/*.js')],
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
})
const db = async () => {
  try {
    await sequelize.authenticate()
    console.log('success')
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true }) // 根据模型同步创建表,生成环境需要关闭
      console.log('table sync done')
    }
  } catch (error) {
    console.error('connect failed', error)
  }
}
export default db
