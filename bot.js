import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Markup } from 'telegraf';
import { createUserHistory, getUserHistory, deleteUserHistory, updateAction, newData, updAndNewData, getByKey, getUserLang, getUserAction } from './useractions.js';
import ChosenLanguage from './lang.js';
import fs from 'fs';
import { get } from 'http';

const uzlang = new ChosenLanguage("uz");
const rulang = new ChosenLanguage("ru");

const bot = new Telegraf("6254027757:AAHzDTgc95hHhfdiJm4--eC44_DCHoVXmPk");
bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  await ctx.leaveChat();
});
bot.start((ctx) => ctx.reply(`Здравствуйте! Давайте для начала выберем язык обслуживания!

Assalomu aleykum! Keling, avvaliga xizmat ko’rsatish tilini tanlab olaylik.
`,
  Markup.inlineKeyboard([
    Markup.button.callback('🇺🇿 O\'zbekcha', 'uz'),
    Markup.button.callback('🇷🇺 Русский', 'ru'),
  ]))
);


bot.on('callback_query', async (ctx) => {

  // keep this down(me)
    let userData = {
      id: ctx.callbackQuery.from.id,
      name: ctx.callbackQuery.from.first_name,
      language: ctx.callbackQuery.data,
      username: ctx.callbackQuery.from.username,
    }
    createUserHistory(userData.id, userData.username, userData.name, userData.language, "askContact"); 
    let answer = getLang(ctx.callbackQuery.from.id);
    ctx.deleteMessage();
    ctx.reply(answer.greetingContactText(ctx.callbackQuery.from.first_name), Markup.keyboard([
      // phoneKeyboard
      Markup.button.contactRequest(answer.contactButtonText()),
      // locationKeyboard
    ]).resize());
    ctx.answerCbQuery();
});

// get user phone number
bot.on('contact', async (ctx) => {
  updAndNewData(ctx.message.from.id, "askRegion", "phone", ctx.message.contact.phone_number);
  ctx.reply(getLang(ctx.message.from.id).regionText(), Markup.keyboard(
    getLang(ctx.message.from.id).regions()
  ).resize());
});


bot.on('message', async (ctx) => {
  let answer = getLang(ctx.message.from.id);
  console.log(getUserAction(ctx.message.from.id));
  if(getUserAction(ctx.message.from.id) == "askRegion") {
    updAndNewData(ctx.message.from.id, "askTireOrAccessories", "region", ctx.message.text);
    ctx.reply(answer.tireORaccessoriesText(), Markup.keyboard([answer.tireORaccessoriesButtons()]).resize());
  }
  else if(getUserAction(ctx.message.from.id) == "askTireOrAccessories"){
    updAndNewData(ctx.message.from.id, "askTireSeason", "tireOrAccessories", ctx.message.text);
    ctx.reply(answer.tireSeasonText(), Markup.keyboard([answer.tireSeasonButtons()]).resize());
  }
  else if(getUserAction(ctx.message.from.id) == "askTireSeason"){
    updAndNewData(ctx.message.from.id, "askDiameter", "tireSeason", ctx.message.text);
    ctx.reply(answer.diametersOfTiresText(), Markup.keyboard(answer.diameterButtons()).resize());
  }
  else if(getUserAction(ctx.message.from.id) == "askDiameter"){
    updAndNewData(ctx.message.from.id, "askWidth", "diameter", ctx.message.text);
    ctx.reply(answer.sizesOfTiresText(), Markup.keyboard(answer.sizesOfTiresButtons()).resize());
  }
});

    

bot.on('inline_query', async (ctx) => {
  const result = [];
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  await ctx.answerInlineQuery(result);
});

bot.launch();

// create a function that gets user id and returns its language and choose either uzlang or rulang
function getLang(id) {
  let userLang = getUserLang(id);
  console.log(userLang, "userLang");
  if (userLang == "uz") {
    return uzlang;
  } else {
    return rulang;
  }
}
  

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));