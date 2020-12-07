const bot = require('../bot');

function lie(msg) {
    const chatId = msg.chat.id;
    let percent = Math.floor(Math.random() * (100 + 1));

    if (msg.reply_to_message == undefined) {
        bot.sendMessage(chatId, 'Тут нечего проверять');
    } else if (msg.reply_to_message.from.is_bot) {
        bot.sendMessage(chatId, 'Ты что, петух? Я никогда не вру!');
    } else {
        let text = `_"${msg.reply_to_message.text}"_ - пиздёж на *${percent}%*`;
        bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    }
};

module.exports = lie;