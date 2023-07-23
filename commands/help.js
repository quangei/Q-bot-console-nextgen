const fs = require('fs')
const path = require('path')
const commands = require('../main')
module.exports = {
    command: 'help',
    description: 'show the list of available commands',
    requiresEntity: false,
    author: 'me, myself, and irene',
    execute: function(sender, command, args) {
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
      readFiles(path.join(__dirname))
      for (const cmd in commands) {
        console.log(`.${cmd} - ${commands[cmd].description}`)
      }
    }
  }