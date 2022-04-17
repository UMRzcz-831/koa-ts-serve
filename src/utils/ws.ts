import { Server } from 'ws'
export default (wss: Server) => {
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message: string) {
      try {
        const { data, event } = JSON.parse(message)
        console.log(data, event)
      } catch (error) {
        console.log(error)
      }
      // console.log('received: %s', message)
    })
    ws.send('call it connected')
  })
}
