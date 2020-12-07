const bot = require('./bot');
const request = require('request');


//==========================================
// Custom modules
const Rating = require('./modules/rating');
const Valute = require('./modules/valute');
const autor = require('./modules/autor');
const sayHi = require('./modules/sayHi');
const botWord = require('./modules/botWord');
const roullete = require('./modules/roulette');
const coin = require('./modules/coin');
const boobs = require('./modules/boobs');
const fuck = require('./modules/fuck');
const lie = require('./modules/lie');
//Custom modules
//==========================================
const fs = require('fs');

//==========================================
// Bot commands


// Autor 
bot.onText(/\/autor/, (msg) => {
    autor(msg);
});

// Russian roullete
bot.onText(/\/roulette/, (msg) => {
    roullete(msg);
});

// Flip coin
bot.onText(/\/coin/, (msg) => {
    coin(msg);
});

// Valute courses
bot.onText(/\/valute/, (msg) => {
    Valute.call(msg);
});
bot.on('callback_query', query => {
    Valute.result(query);
});

// Tits pics ;)
bot.onText(/\/boobs/, (msg) => {
    boobs(msg);
});

// "Fuck you" function
bot.onText(/\/fuck (.+)/, (msg) => {
    fuck(msg);
});

// "Check lie" function
bot.onText(/\/pizdezh/, (msg) => {
    lie(msg);
});

// Weather /weather and city name after space

bot.onText(/\/weather (.+)/, (msg) => {

    const chatId = msg.chat.id;
    let splitter = msg.text.split(" ");
    let city = encodeURI(splitter[1]);
    let weather,
        weatherMessage;

    request(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=94dfa06b455d748bb2cc458b9def131b&units=metric`, function(error, response, body) {
        weather = JSON.parse(body);
        if (weather.cod == "404") {
            bot.sendMessage(chatId, 'Город с таким названием не найден');
        } else {
            weatherMessage = `
      *Погода в городе ${weather.city.name}*
      ${weather.list[0].weather[0].main}
      Температура: ${weather.list[0].main.temp} ℃
      Ветер: ${weather.list[0].wind.speed} м/с
      Давление: ${weather.list[0].main.pressure} hPa
      `;
            bot.sendMessage(chatId, weatherMessage, { parse_mode: 'Markdown' });
        }
    });
});


bot.onText(/\/rating/, (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from.first_name;
    if (Rating.checkChat(msg)) {
        let text = `
    *Рейтинг считается в баранах 🐑. Бараны добавляются за активность в чате*

    Показать сиськи - *5* 🐑
    Один патрон для рулетки - *2* 🐑

    ${user}, в вашем стаде: *${Rating.checkRating(msg)}* 🐑
    `;
        bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    } else {
        bot.sendMessage(chatId, 'Система рейтинга не поддерживается вашим чатом');
    }
});

bot.on('message', (msg) => {

    //Rating for text messages
    if (Rating.checkChat(msg)) {
        Rating.addPoints(msg);
    }

    //Say "Hi!"
    sayHi(msg);

    // "Bot"-word reaction
    botWord(msg);
});