### Description
A simple bot to inform webpage changes to a telegram bot chat.

## How to run the application
- Make sure node.js and npm are installed. If not follow the steps at https://nodejs.org/en/download.
- Go to the parent directory and run `npm install` to install the dependencies.
- Create a `.env` file and copy contents of `.env.example` to it.
- Install telegram app and create a new bot:
  - Search for `@BotFather` and start a conversation.
  - Follow the procedure to create a new bot.
  - A token for http api would be provided and set `TELEGRAM_HTTP_API_TOKEN` in `.env` file to this token string (Example: `TELEGRAM_HTTP_API_TOKEN=12345....sfds`) and save the file.
  - Find the newly created telegram bot by searching its name and send messages to it.
  - Later make an http request to the url `https://api.telegram.org/bot<TELEGRAM_HTTP_API_TOKEN>/getUpdates` (Example: `https://api.telegram.org/bot12345....sfds>/getUpdates`) in the browser or using postman. You should get a chat ID in the response.
  - Store the chat id in the response by setting `BOT_CHAT_ID` field in `.env` file to it (Example: `BOT_CHAT_ID=12345678`) and then save the `.env` file.
- Run the test server using `npm run test-server` in a terminal. The `index.html` file will be updated after every 20 seconds.
- Open another terminal and run the command `npm run start -- -p [Page Url] -m "[The message you want to send to telegram]" -s [Integer for seconds]` (Example: `npm run start -- -p http://localhost:3000 -m "The web page has updated" -s 10`. Here after every 10 seconds the cron would make request to `http://localhost:3000` and if html file change found then it would send message `The web page has updated` to the telegram bot.). 
