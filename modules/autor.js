const bot = require('../bot');

function autor(msg) {
    const chatId = msg.chat.id;
    return bot.sendMessage(chatId, '<strong>Автор бота - Балод Илья</strong> \n <a href="https://vk.com/spunky.monkey">Связаться со мной</a>', { parse_mode: "HTML" });
} ;

module.exports = autor;