import { Server, WebSocket } from 'ws'

const generateCode = () => {
  // mock 随机code
  const code = Math.floor(Math.random() * 999999999 - 100000000) + 100000000
  return code
}

const code2Ws = new Map<number, WebSocket>()

export default (wss: Server) => {
  wss.on('connection', function connection(ws) {
    const code = generateCode()
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
      }
      if (event === 'control') {
        let remote = +data.remote
        if (code2Ws.has(remote)) {
          // @ts-ignore
          ws.sendData('controlled', { remote })
          // @ts-ignore
          ws.sendRemote = code2Ws.get(remote).sendData
          // @ts-ignore
          ws.sendRemote('beControlled', { remote: code })
        }
      }

      if (event === 'forward') {
        // @ts-ignore
        ws.sendRemote(event, data)
      }
    })

    ws.on('close', () => {
      code2Ws.delete(code)
      // @ts-ignore
      clearTimeout(ws._closeTimeout)
    })

    // @ts-ignore
    ws._closeTimeout = setTimeout(() => {
      ws.terminate()
    }, 1000 * 60 * 60)

    ws.send('call it connected')
  })
}
