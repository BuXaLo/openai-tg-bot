const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BOT_USERNAME = process.env.BOT_USERNAME;
const GROUP_ID = process.env.GROUP_ID; //you can remove this field if you want to make it work in all groups where it added

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

bot.onText(/^\/chat (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prompt = match[1];

  try {
    // Call OpenAI API to generate an image
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 3900
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
  } catch (error) {
    // Handle the error and send an error message to the chat
    console.error(error);
    bot.sendMessage(chatId, 'An error occurred while processing your request. Please try again later.');
  }
});
bot.onText(/^\/pic (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prompt = match[1];

  try {
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
  } catch (error) {
    // Handle the error and send an error message to the chat
    console.error(error);
    bot.sendMessage(chatId, 'An error occurred while processing your request. Please try again later.');
  }
});
