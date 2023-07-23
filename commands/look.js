module.exports = {
  command: 'look',
  description: 'make the bot look at a direction',
  requiresEntity: true,
  author: 'me, myself, and irene',
  execute: function(sender, command, args) {
    if (args.length !== 2) {
      console.log('Usage: .look  ')
      return
    }
    const yaw = Number(args[0])
    const pitch = Number(args[1])
    if (isNaN(yaw) || isNaN(pitch)) {
      console.log('Invalid arguments: yaw and pitch must be numbers')
      return
    }
    sender.look(yaw, pitch)
  }
}