import dotenv from 'dotenv'
dotenv.config()

export const config = {
  serve: {
    port: process.env.PORT,
    env: process.env.NODE_ENV
  },
  db: {
    port: process.env.DB_PORT,
    database: process.env.DB_NAME as string,
  },
  jwt:{
      jwt_secret: process.env.JWT_SECRET as string
  }
}
