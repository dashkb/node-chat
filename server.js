const net = require('net')
const c = require('colors/safe')
const Client = require('./src/server/client')

const port = process.env.PORT

const server = net.
  createServer(clientConnected).
  on('listening', startedListening).
  listen(port)

function clientConnected(socket) {
  Client.createFromSocket(socket)
}

function startedListening() {
  console.log(
    c.blue(`Chat server listening on port ${port}`)
  )
}
