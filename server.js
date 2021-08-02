const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/db");
const FirstName = require("./models/name");


dotenv.config({ path: "./config/config.env" });
db.connectDB();

const app = express();


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`SERVER running in ${process.env.NODE_ENV}
      mode on port  ${PORT}`)
  );