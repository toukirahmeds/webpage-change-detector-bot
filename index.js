import "dotenv/config";
import minimist from "minimist";
import schedule from "node-schedule";
import telegramBotAPI from "node-telegram-bot-api";

const {
    p,
    s = 5,
    m = "The target page has been updated!"
} = minimist(process.argv);

let pageUrl;

try {
    pageUrl = new URL(p);
} catch (err) {
    console.error(err);
    console.error(`Option '-p' must be valid url`);
    process.exit(9);
}

let timeSeconds;

try {
    timeSeconds = parseInt(s);

    if (isNaN(timeSeconds) || timeSeconds < 0) {
        throw new Error("Must be a valid positive number.");
    }
} catch (err) {
    console.error(err);
    console.error(`Option '-s' must be a valid positive number.`);
    process.exit(9);
}

let message;

try {
    message = m;

    if (!message || message?.length === 0 || typeof message !== "string") {
        throw new Error("Must be a valid non-empty string.")
    }
} catch (err) {
    console.error(err);
    console.error(`Option '-m' must be a valid message string.`);
    process.exit(9);
}

const {
    TELEGRAM_HTTP_API_TOKEN,
    BOT_CHAT_ID
} = process.env;

const telegramBot = new telegramBotAPI(TELEGRAM_HTTP_API_TOKEN);

const fetchHtmlAsync = async pageUrl => {
    try {
        const response = await fetch(pageUrl);
        return response.text();
    } catch (err) {
        console.error(err);
    }
};

let oldHtml;
let currentHtml

schedule.scheduleJob(`*/${timeSeconds} * * * * *`, async () => {
    try {
        const currentHtml = (await fetchHtmlAsync(pageUrl)).trim();

        if (!oldHtml) {
            oldHtml = currentHtml;
        }

        if (oldHtml === currentHtml) {
            return console.log("No change in html.");
        }

        const msg = message;
        console.log(msg);
        
        await telegramBot.sendMessage(
            BOT_CHAT_ID,
            msg
        );
        
        oldHtml = currentHtml;
    } catch (err) {
        console.error(err);
    }
});
