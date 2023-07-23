// jump.js
module.exports = {
    command: 'jump',
    description: 'make the bot jump',
    requiresEntity: true,
    author: 'me, myself, and irene',
    execute: function(sender, command, args) {
      // make the bot jump
      sender.setControlState('jump', true)
      // stop jumping after a delay
      setTimeout(() => {
        sender.setControlState('jump', false)
      }, 500)
    }
  }
  