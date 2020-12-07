const bot = require('../bot');

function fuck(msg) {
    const chatId = msg.chat.id;
    const user = msg.text.split(" ")[1];
    return bot.sendMessage(chatId, `Эй, ${user} (° ͜ʖ͡°)╭∩╮`);
} ;

module.exports = fuck;