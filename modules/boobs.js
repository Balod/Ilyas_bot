const bot = require('../bot');
const Pornsearch = require('pornsearch');
const Rating = require('./rating');

function boobs(msg) {
    const chatId = msg.chat.id;
    let item = Math.floor(Math.random() * (20 + 1));
    let Searcher = new Pornsearch('', driver='sex');

    const question = 'Как тебе?';
    const options = ['Матур кыз', 'Ямьсез кыз'];
    let opt = JSON.stringify(options);

    if (Rating.checkChat(msg)) {
        if (Rating.checkRating(msg) < 5) {
            bot.sendMessage(chatId, `${msg.from.first_name} малай, а баранов🐑 то у тебя не хватает! Чтоб узнать цену напиши \/rating`);
        } else {
            Searcher.pics()
                .then(pic => bot.sendPhoto(chatId, pic[item].attribs.src));

            setTimeout(() => {
                bot.sendPoll(chatId, question, opt)
            }, 4500);

            Rating.removePoints(msg, 5);
        }
    } else {
        Searcher.pics()
            .then(pic => bot.sendPhoto(chatId, pic[item].attribs.src));
    }
}

module.exports = boobs;