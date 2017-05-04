const c = require('colors/safe')

// Collection of connected clients
const clients = []
let nextId = 0

module.exports = class Client {
  get identifier() {
    return `socket ${this.id}`
  }

  static createFromSocket(socket) {
    new Client(socket)
  }

  static findBy(prop, val) {
    return clients.find(client => {
      return client[prop] === val
    })
  }

  static broadcast(message, options={}) {
    clients.forEach(client => {
      if(options.except && options.except === client) { return }
      client.send(message)
    })
  }

  static get count() {
    return clients.length
  }

  constructor(socket) {
    this.socket = socket
    this.id = nextId++

    this.socket.on('data', this.receive.bind(this))
    this.socket.on('close', this.destroy.bind(this))

    clients.push(this)
    console.log(
      c.green(`${this.identifier}: connected (${Client.count} current)`)
    )
    this.send(c.blue(`Hello! You are ${this.identifier}`))
  }

  send(data) {
    this.socket.write(data + '\n')
  }

  receive(data) {
    data = data.toString().trim()

    console.log(
      c.bold(`${this.identifier}: said ${data}`)
    )

    Client.broadcast(`${c.bold(this.identifier)}: ${data}`, {
      except: this
    })
  }

  destroy() {
    clients.splice(clients.indexOf(this), 1)
    console.log(`${this.identifier}: disconnected (${Client.count} current)`)
  }
}
