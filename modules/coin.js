const bot = require('../bot');

function coin(msg) {
    const chatId = msg.chat.id;
    const value = Math.round(Math.random() * (2 - 1) + 1);

    if (value == 1) {
        bot.sendMessage(chatId, "Вам выпала решка.");
    } else {
        bot.sendMessage(chatId, "Вам выпал орёл.");
    }
}

module.exports = coin;