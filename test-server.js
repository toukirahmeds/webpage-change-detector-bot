import "dotenv/config";
import express from "express";

const { SERVER_PORT = 3000 } = process.env;

const ADDRESS = `http://localhost:${SERVER_PORT}`;

const app = express();

app.use(express.static("public"));

app.listen(SERVER_PORT, () => {
    console.log(`Server running on ${ADDRESS}`);
});
