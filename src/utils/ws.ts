import { Server, WebSocket } from 'ws'

const generateCode = () => {
  // mock 随机code
  const code = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000
  return code
}

const code2Ws = new Map<number, WebSocket>()

const oppositeMap: Record<number, undefined | number> = {}

export default (wss: Server) => {
  wss.on('connection', function connection(ws) {
    const code = generateCode()
    // let beControlledCode: number

    code2Ws.set(code, ws)
    console.log('in map', code2Ws.keys())
    // @ts-ignore
    ws.sendData = (event: string, data: any) => {
      ws.send(JSON.stringify({ event, data }))
    }

    ws.on('message', function incoming(message: string) {
      let parseMessage
      try {
        parseMessage = JSON.parse(message)
      } catch (error) {
        // @ts-ignore
        // ws.sendError('message invalid')
        console.log('fail to parse', error)
      }
      const { data, event } = parseMessage
      if (event === 'registLocal') {
        // @ts-ignore
        ws.sendData('registed', { code })
      } else if (event === 'control') {
        let remote = +data.remote
        if (code2Ws.has(remote)) {
          // @ts-ignore   发给控制端，被控端的code
          ws.sendData('controlled', { remote })
          // beControlledCode = remote

          oppositeMap[remote] = code
          oppositeMap[code] = remote

          // @ts-ignore  被控端的ws发给被控制的客户端端，控制端的code
          code2Ws.get(remote).sendData('beControlled', { remote: code })
        } else {
          console.log('remote not found', remote)
          // @ts-ignore
          ws.sendData('remoteNotFound', { remote })
        }
      } else if (event === 'stop-control') {
        console.log('stop-control')
        code2Ws.forEach((o, k) => {
          if (o === ws) {
            console.log('stop-control', k)
            // @ts-ignore
            code2Ws.get(oppositeMap[k]).sendData('end-stream', data)
          }
        })
      } else if (event === 'forward') {
        code2Ws.forEach((o, k) => {
          if (o === ws) {
            console.log(k, 'forward send to', oppositeMap[k], data.event)
            // @ts-ignore
            code2Ws.get(oppositeMap[k]).sendData(data.event, data)
          }
        })
        // @ts-ignore
        // code2Ws.get(beControlledCode).sendData(data.event, data)
      }
    })

    ws.on('error', (err: Error) => {
      console.log('error', err)
    })

    ws.on('close', () => {
      code2Ws.delete(code)
      delete oppositeMap[code]
      // @ts-ignore
      clearTimeout(ws._closeTimeout)
    })

    // @ts-ignore
    ws._closeTimeout = setTimeout(() => {
      ws.terminate()
    }, 1000 * 60 * 60)

    // ws.send('call it connected')
  })
}
