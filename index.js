import minimist from "minimist";

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
        throw new Error("Must not be a empty string.")
    }
} catch (err) {
    console.error(err);
    console.error(`Option '-m' must be a valid message string.`);
    process.exit(9);
}

const fetchHtmlAsync = async pageUrl => {
    try {
        const response = await fetch(pageUrl);
        console.log(await response.text());
    } catch (err) {
        console.error(err);
    }
};

fetchHtmlAsync(pageUrl);
