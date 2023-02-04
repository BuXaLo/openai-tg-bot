const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GROUP_ID = process.env.GROUP_ID;
const BOT_USERNAME = process.env.BOT_USERNAME;

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

bot.onText(new RegExp(`@${BOT_USERNAME} chat`), async (msg) => {
  const chatId = msg.chat.id;
  const prompt = msg.text.split('chat')[1].trim();
  
const response = await axios.post(
'https://api.openai.com/v1/completions',
{
model: 'text-davinci-003',
prompt: prompt,
max_tokens: 100
},
{
headers: {
'Authorization': `Bearer ${OPENAI_API_KEY}`,
'Content-Type': 'application/json'
}
}
);

const generatedText = response.data.choices[0].text;

// Send the generated text back to the chat
bot.sendMessage(chatId, generatedText);
});
bot.onText(new RegExp(`@${BOT_USERNAME} pic`), async (msg) => {
  const chatId = msg.chat.id;
  const prompt = msg.text.split('pic')[1].trim();
  
  // Call OpenAI API to generate an image
  const response = await axios.post(
    'https://api.openai.com/v1/images/generations',
    {
      model: 'image-alpha-001',
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  const imageUrl = response.data.data[0].url;
  
  // Send the generated image back to the chat
  bot.sendPhoto(chatId, imageUrl);
});
