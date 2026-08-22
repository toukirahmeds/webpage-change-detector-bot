import "dotenv/config";
import express from "express";
import { load } from "cheerio";
import fs from "fs/promises";

const FILE_URL = "./public/index.html";

// Server Port
const { SERVER_PORT = 3000 } = process.env;

// Server Address
const ADDRESS = `http://localhost:${SERVER_PORT}`;

// Express server instance.
const app = express();

// Enable /public folder files to be read.
app.use(express.static("public"));

// Counter which changes on each iteration of setInterval timer.
let counter = 1;

/**
 * Runs every 20 seconds and updates the html file data.
 */
setInterval(async () => {
    try {
        // Read the html file data.
        const fileData = await fs.readFile(FILE_URL, "utf-8");
        
        // Parse the html file data using cheerio load function.
        const parsedHtml = load(fileData);

        // Update the value of 'h2' text.
        parsedHtml("h2").text(`Test Header ${counter}`);

        // Write updated html data.
        await fs.writeFile(FILE_URL, parsedHtml.html());
        
        console.log("HTML updated");
        
        // Increment the counter.
        counter++;
    } catch (err) {
        console.error(err);
    }
}, 20000)

// Start the server.
app.listen(SERVER_PORT, () => {
    console.log(`Server running on ${ADDRESS}`);
});
