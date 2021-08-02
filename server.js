const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/db");
const FirstName = require("./models/name");
const path = require("path");



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
        hasStarted: hasStarted,
      });
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`SERVER running in ${process.env.NODE_ENV}
      mode on port  ${PORT}`)
  );