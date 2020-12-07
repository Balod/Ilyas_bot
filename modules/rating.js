/*Система рейтинга для использования команд бота в группах. Рейтинг начисляется
участникам чата за сообщения. Чем больше текста пишет пользователь, тем выше его
рейтинг. Баллы начисляются только за текстовые сообщения. Ссылки и команды для
бота не учитываются*/

// Автор: Балод И.Л.
// https://t.me/ILUSHA_B

'use strict';

const fs = require('fs');

//Конструктор нового пользователя
const NewUser = (name) => {
    return { first_name: name, rating: 10 }
}

//Проверяет сообщение, не является ли оно командой для бота или ссылкой
const checkEntities = msg => {
    if (msg.entities !== undefined) {
        if (msg.entities[0].type == 'bot_command' || msg.entities[0].type == 'url') return false;
        return true;
    }
    return true;
}

//Проверяет есть ли в базе данный пользователь. Если пользователь не найден, то добавляет его в базу
const checkUser = (msg, data) => {
    const userId = msg.from.id.toString();

    if (!(userId in data)) {
        data[userId] = NewUser(msg.from.first_name);
        data = JSON.stringify(data);
        fs.writeFileSync('data/data.json', data);
    }
}

const Rating = {
    checkRating: function(msg) { //Возвращает рейтинг пользователя
        let data = fs.readFileSync('data/data.json', 'utf8');
        data = JSON.parse(data);
        const userId = msg.from.id.toString();

        checkUser(msg, data);

        return data[userId].rating.toFixed(1);
    },
    addPoints: function(msg) { //Добавляет очки пользователю при соблюдении условий
        let text = msg.text.split(' ');

        if (checkEntities(msg) && text.length >= 5 && msg.text.charAt(0) !== '/') {
            const userId = msg.from.id.toString();
            let data = fs.readFileSync('data/data.json', 'utf8');
            data = JSON.parse(data);

            checkUser(msg, data);

            data[userId].rating += text.length * 0.1;
            data[userId].rating = +Math.fround(data[userId].rating).toFixed(1);
            data = JSON.stringify(data);
            fs.writeFileSync('data/data.json', data);
        }
    },
    checkChat: function(msg) {
        const chatId = -1001298883943; //Измените номер ID на номер своего чата
        if (msg.chat.id == chatId) return true;

        return false;
    },
    removePoints: function(msg, points) { //Отнимает очки у пользователя
        const userId = msg.from.id.toString();
        let data = fs.readFileSync('data/data.json', 'utf8');
        data = JSON.parse(data);
        data[userId].rating -= points;
        data[userId].rating = +Math.fround(data[userId].rating).toFixed(1);
        data = JSON.stringify(data);
        fs.writeFileSync('data/data.json', data);
    },
    topRating: function() { //Возвращает сортированый по рейтингу массив участников чата
        let data = fs.readFileSync('data/data.json', 'utf8');
        data = JSON.parse(data);
        let topRating = [];
        for (let key in data) {
            topRating.push(data[key]);
        };
        topRating.sort((a, b) => b.rating - a.rating);
        return topRating;
    }
}

module.exports = Rating;