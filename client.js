const UI = require('./src/client/ui')

UI.start()

// TODO add instructions for connecting to the server
UI.addMessage('system', 'Welcome to chat! Type `/q` to quit.', {
  color: 'green'
})

// TODO send this message to the server
UI.on('message', function(text) {
  UI.addMessage('you', text)
})

// TODO support the following:
// * /connect 1.2.3.4 6666
// * /me takes some action in the third person
// * /join #channel
// * /part #channel
UI.on('slash-command', function({command, args}) {
  UI.addMessage('system', `No such command: ${command}`, {
    color: 'red'
  })
})

// TODO get rid of this, it's just an (annoying) demo
setInterval(function() {
  UI.addMessage('system', 'beep', {
    color: 'blue'
  })
}, 1000)

console.log = function(...messages) {
  messages.forEach(message => {
    UI.addMessage('console', message)
  })
}
