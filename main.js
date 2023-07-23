const mineflayer = require('mineflayer')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'Bot',
  version: '1.18.2'
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const commands = {}

function readFiles(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    if (stats.isFile()) {
      const command = require(filePath)
      commands[command.command] = command
    } else if (stats.isDirectory()) {
      readFiles(filePath)
    }
  }
}

readFiles(path.join(__dirname, 'commands'))

bot.on('chat', (username, message) => {
  console.log(`<${username}> ${message}`)
})

rl.on('line', (line) => {
  if (line.startsWith('.')) {
    const [command, ...args] = line.slice(1).split(' ')
    if (commands[command]) {
      commands[command].execute(bot, command, args)
    } else {
      console.log(`Unknown command: ${command}`)
    }
  } else {
    bot.chat(line)
  }
})

module.exports.commands = commands
