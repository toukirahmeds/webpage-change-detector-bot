import minimist from "minimist";

const {
    p: pageUrl,
    s: timeSeconds = 5,
    m: message = "The target page has been updated!"
} = minimist(process.argv);

console.log(minimist(process.argv));
if (!pageUrl || typeof pageUrl !== "string") {
    console.error(`The value for '-p' must be provided a valid url.`);
    process.exit(1);
}

console.log(pageUrl, timeSeconds, message)