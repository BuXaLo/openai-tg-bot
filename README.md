# openai-tg-bot
Simple code on javascript for telegram bot which can generate text and images 

Fill .env with your bot token, openai api key, group id and bot name

This bot have 2 triggers "chat" and "pic" 
So you need just mention your bot in chat , place trigger and then promt, like this:
@AI-tg_bot pic cat - for this you will have picture of cat as response, if you want text answer just replace 'pic' with 'chat'

>you can remove this field if you want to make it work in all groups where it added    "const GROUP_ID = process.env.GROUP_ID;"
