// look.js
module.exports = {
    command: 'look',
    description: 'make the bot look at a direction',
    requiresEntity: true,
    author: 'me, myself, and irene',
    execute: function(sender, command, args) {
      // check if the args are valid
      if (args.length !== 2) {
        console.log('Usage: .look <yaw> <pitch>')
        return
      }
      // parse the args as numbers
      const yaw = Number(args[0])
      const pitch = Number(args[1])
      // check if the args are numbers
      if (isNaN(yaw) || isNaN(pitch)) {
        console.log('Invalid arguments: yaw and pitch must be numbers')
        return
      }
      // make the bot look at the direction
      sender.look(yaw, pitch)
    }
  }
  