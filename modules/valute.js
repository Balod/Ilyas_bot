const bot = require('../bot');
const request = require('request');

const Valute = {
    call: function (msg) {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, 'Выберите валюту', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: '€ EUR',
                        callback_data: 'EUR'
                    }],
                    [{
                        text: '$ USD',
                        callback_data: 'USD'
                    }],
                    [{
                        text: '₿ BTC',
                        callback_data: 'BTC'
                    }]
                ]
            }
        });
        return false;
    },
    result: function(query) {
        const id = query.message.chat.id;
        let valute = query.data;
        let result,
            md;

        if (valute === "BTC") {

            request('https://blockchain.info/ru/ticker', function(error, response, body) {
                const data = JSON.parse(body);
                md = `
            *Курс BTC:*
            К Рублю - ${data.RUB.buy}
            К Доллару США - ${data.USD.buy}
            `;

                bot.sendMessage(id, md, { parse_mode: 'Markdown' });
                return false;
            });
            return;

        } else if (valute === "USD" || valute === "EUR") {

            request('https://www.cbr-xml-daily.ru/daily_json.js', function(error, response, body) {
                const data = JSON.parse(body);

                for (let key in data.Valute) {
                    if (key === query.data) {
                        result = data.Valute[key];
                    }
                }

                md = `
            *${result.Name} к Рублю:*
            ${result.Value}
            `;

                bot.sendMessage(id, md, { parse_mode: 'Markdown' });
                return;
            });
        }
        return false;
    }
}

module.exports = Valute;