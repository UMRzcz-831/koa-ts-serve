import dotenv from 'dotenv'
dotenv.config()

export const config = {
  serve: {
    port: process.env.PORT,
    env: process.env.NODE_ENV
  },
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
  },
  jwt:{
      jwt_secret: process.env.JWT_SECRET as string
  },
  qiniu:{
    accessKey: process.env.ACCESS_KEY as string,
    secretKey: process.env.SECRET_KEY as string,
    bucket: process.env.BUCKET_NAME as string,
  }
}
