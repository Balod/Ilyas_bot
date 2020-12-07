const bot = require('../bot');
const Rating = require('./rating');

function roullete(msg) {
    const chatId = msg.chat.id;
    const user = msg.from.id;
    const chans = Math.floor(Math.random() * (7 - 1) + 1);

    if (Rating.checkChat(msg)) {
        if (Rating.checkRating(msg) < 2) {
            bot.sendMessage(chatId, `${msg.from.first_name} малай, а патронов то у тебя нет! Чтоб узнать цену патрона напиши \/rating`);
        } else {
            if (shot == chans) {
                bot.sendMessage(chatId, `${msg.from.first_name} малай нажимает на курок и... раздаётся выстрел! Хуш, кадерле ${msg.from.first_name}...`);
                bot.kickChatMember(chatId, user);
                setTimeout(() => {
                    bot.unbanChatMember(chatId, user);
                    bot.sendMessage(chatId, "");
                }, 300000);
            } else {
                bot.sendMessage(chatId, `${msg.from.first_name} малай нажимает на курок и... ничего не происходит. Какой везучий, минем яхшы!`);
            }
            Rating.removePoints(msg, 2);
        }
    } else {
        if (chans == 1) {
            bot.sendMessage(chatId, `${msg.from.first_name} малай нажимает на курок и... раздаётся выстрел! Хуш, кадерле ${msg.from.first_name}...`);
            bot.kickChatMember(chatId, user);
            setTimeout(() => {
                bot.unbanChatMember(chatId, user);
                bot.sendMessage(chatId, "");
            }, 300000);
        } else {
            bot.sendMessage(chatId, `${msg.from.first_name} малай нажимает на курок и... ничего не происходит. Какой везучий, минем яхшы!`);
        }
    }
}

module.exports = roullete;