const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/db");
const FirstName = require("./models/name");
const path = require("path");
const constants = require("./config/constants");
const GenderApi = require("gender-api.com-client");

const gameHasStarted = false;

dotenv.config({ path: "./config/config.env" });
db.connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", async function (req, res) {
    await db.getRandomFirstName(FirstName).then((randomFirstName) => {
        res.render(`${path.join(__dirname, "views", "index.ejs")}`, {
            randomFirstName: randomFirstName,
            score: constants.INITIAL_POINTS,
            gameHasStarted: gameHasStarted
        });
    });
});


var genderApiClient = new GenderApi.Client(
    constants.GENDER_API_KEY);

app.post("/", async (req, res) => {
    var score = parseInt(req.body.score);
    let fName = req.body.firstname;

    genderApiClient.getByFirstName(fName, async function (response) {
        if (response.gender === req.body.gender) {
            score += 1;
        } else if (req.body.gender === "mixed") {
            score = constants.MIXED_VALUE > response.accuracy ? score + 1 : score - 1;
        } else {
            score -= 1;
            console.log("score", score);
        }

        await db.getRandomFirstName(FirstName).then((randomFirstName) => {
            res.render(`${path.join(__dirname, "views", "index.ejs")}`, {
                randomFirstName: randomFirstName,
                score: score,
                gameHasStarted: gameHasStarted,

            });
        });
    });
});


app.get("/restart", async function (req, res) {
    await db.getRandomFirstName(FirstName).then((randomFirstName) => {
        res.render(`${path.join(__dirname, "views", "index.ejs")}`, {
            randomFirstName: randomFirstName,
            score: constants.INITIAL_POINTS,
            gameHasStarted: gameHasStarted

        });
    });
});
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`SERVER running in ${process.env.NODE_ENV}
      mode on port  ${PORT}`)
);