// help.js
const fs = require('fs')
const path = require('path')
module.exports = {
    command: 'help',
    description: 'show the list of available commands',
    requiresEntity: false,
    author: 'me, myself, and irene',
    execute: function(sender, command, args) {
      // load all the commands from the commands folder
      const commands = {}
      fs.readdirSync(path.join(__dirname)).forEach(file => {
        const command = require(path.join(__dirname, file))
        commands[command.command] = command
      })
      // loop through all the commands and print their descriptions
      for (const cmd in commands) {
        console.log(`.${cmd} - ${commands[cmd].description}`)
      }
    }
  }
