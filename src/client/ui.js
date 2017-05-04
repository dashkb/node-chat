const blessed = require('blessed')
const EventEmitter = require('events')

const screen = blessed.screen({
  smartCSR: true,
})

const messages = blessed.box({
  top: '0',
  left: '0',
  width: '100%',
  height: '90%',
  tags: true,
  scrollable: true
})

const input = blessed.textbox({
  inputOnFocus: true,
  keys: true,
  height: '10%',
  top: '90%',
  width: '100%',
  border: {
    type: 'line'
  },
})

input.on('submit', function() {
  const value = input.value
  input.clearValue()
  screen.render()
  input.focus()

  process.nextTick(function() {
    handleInput(value)
  })
})

function handleInput(text) {
  if(text[0] == '/') {
    handleSlashCommand(text.slice(1))
  } else {
    UI.emit('message', text)
  }
}

function handleSlashCommand(text) {
  const parts = text.split(' ')
  const command = parts[0]
  const args = parts.slice(1)

  if(command == 'q') {
    process.exit()
  } else {
    UI.emit('slash-command', {
      command,
      args
    })
  }
}

const UI = module.exports = Object.assign(new EventEmitter(), {
  start() {
    screen.title = 'chat'
    screen.append(messages)
    screen.append(input)
    screen.render()
    input.focus()
  },

  addMessage(from, text, opts={}) {
    if(opts.color) {
      text = `{${opts.color}-fg}${text}{/}`
    }

    messages.pushLine(`{bold}${from}:{/bold} ${text}`)
    messages.setScrollPerc(100)
    screen.render()
  }
})

