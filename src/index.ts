import Koa from 'koa'
import koaBody from 'koa-body'
import BodyParser from 'koa-bodyparser'
import { createServer } from 'http'
import Cors from 'koa2-cors'
import { corsHandler } from './middlewares/cors'
import router from './router'
import AccessLogger from './middlewares/AccessLogger'
import db from './db/index'
import { config } from './config'
import WebSocket from 'ws'
import WSApi from './utils/ws'

const app = new Koa()

const server = createServer(app.callback())

const wss = new WebSocket.Server({
  // 同一个端口监听不同的服务
  server,
})


db()

// ctx.body
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024,
    },
  }),
)
// app.use(BodyParser())
// cors
app.use(Cors(corsHandler))

// 访问日志
app.use(AccessLogger)

// router
app.use(router.routes())

const msg: string = 'Hello World'

app.use(async (ctx: Koa.Context): Promise<void> => {
  ctx.body = msg
})

WSApi(wss)
server.listen(config.serve.port)
// app.listen(config.serve.port)
