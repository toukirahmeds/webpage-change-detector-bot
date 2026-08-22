import "dotenv/config";
import minimist from "minimist";
import schedule from "node-schedule";
import telegramBotAPI from "node-telegram-bot-api";

const {
    TELEGRAM_HTTP_API_TOKEN,
    BOT_CHAT_ID
} = process.env;

const {
    p,
    s = 5,
    m = "The target page has been updated!"
} = minimist(process.argv);

/**
 * Set value of 'p' to 'pageUrl' and validate.
 */
let pageUrl;

try {
    pageUrl = new URL(p);
} catch (err) {
    console.error(err);
    console.error(`Option '-p' must be valid url`);
    process.exit(9);
}

/**
 * Set value of 's' to 'timeSeconds' and validate.
 */
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

/**
 * Set value of 'm' to 'message' and validate.
 */
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

/**
 * Request to the url and fetch html file string.
 * 
 * @param {string} pageUrl 
 * @returns {string}
 */
const fetchHtmlAsync = async pageUrl => {
    try {
        const { text } = await fetch(pageUrl);
        return text();
    } catch (err) {
        console.error(err);
    }
};

let oldHtml;
let currentHtml;
const telegramBot = new telegramBotAPI(TELEGRAM_HTTP_API_TOKEN);

/**
 * Runs on every [timeSeconds] seconds.
 */
schedule.scheduleJob(`*/${timeSeconds} * * * * *`, async () => {
    try {
        const currentHtml = (await fetchHtmlAsync(pageUrl)).trim();

        if (!oldHtml) {
            oldHtml = currentHtml;
        }

        // if `oldHtml` and `currentHtml` are same, then
        // print a log and do not execute further.
        if (oldHtml === currentHtml) {
            return console.log("No change in html.");
        }

        /**
         * `oldHtml` and `currentHtml` are not same, so
         * set `msg` to value of `message` and send it
         * to the telegram bot. 
         */
        const msg = message;

        console.log(msg);
        
        await telegramBot.sendMessage(
            BOT_CHAT_ID,
            msg
        );
        
        // Finally set `oldHtml` to value of `currentHtml`
        oldHtml = currentHtml;
    } catch (err) {
        console.error(err);
    }
});
