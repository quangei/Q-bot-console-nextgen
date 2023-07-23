// main.js
const mineflayer = require('mineflayer')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

// create a bot with your options
const bot = mineflayer.createBot({
  host: '192.168.1.10',
  port: 56825,
  username: 'Bot',
  version: '1.18.2'
})

// create a readline interface to chat from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// load all the commands from the commands folder
const commands = {}
fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
  const command = require(path.join(__dirname, 'commands', file))
  commands[command.command] = command
})

// listen for chat messages from the bot or the terminal
bot.on('chat', (username, message) => {
  console.log(`<${username}> ${message}`)
})

rl.on('line', (line) => {
  // if the line starts with a dot, it is a command
  if (line.startsWith('.')) {
    // split the line into command and arguments
    const [command, ...args] = line.slice(1).split(' ')
    // check if the command exists
    if (commands[command]) {
      // execute the command with the sender, command and arguments
      commands[command].execute(bot, command, args)
    } else {
      // unknown command
      console.log(`Unknown command: ${command}`)
    }
  } else {
    // otherwise, it is a chat message
    bot.chat(line)
  }
})

module.exports.commands = commands

