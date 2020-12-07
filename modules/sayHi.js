const bot = require('../bot');

function sayHi(msg) {
    const chatId = msg.chat.id;
    let text = msg.text.toLowerCase();
    let hi = ["привет", "здорова", "салам", "исямисес", "исемесес", "исәнмесез",
        "салям", "салют", "здравствуйте", "хай", "доброе утро",
        "добрый день", "доброго дня", "добрый вечер", "доброй ночи",
        "доброго вечера", "доброго утра",
        "утра", "здаров", "приффки", "превед", "хеллоу", "алоха",
        "шалом", "хауди"
    ];

    for (let i = 0; i < hi.length; i++) {
        if (text.indexOf(hi[i]) >= 0) {
            bot.sendMessage(chatId, `Исәнмесез, ${msg.from.first_name}!`);
        }
    }
}

module.exports = sayHi;