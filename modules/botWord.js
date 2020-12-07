const bot = require('../bot');

function botWord(msg) {
    const chatId = msg.chat.id;
    let text = msg.text.toLowerCase().split(" ");

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "бот") {
            bot.sendMessage(chatId, `А может это ты бот, ${msg.from.first_name}?`);
        }
    }
}

module.exports = botWord;