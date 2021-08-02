const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/db");

dotenv.config({ path: "./config/config.env" });
db.connectDB();

const app = express();



app.listen(
    PORT,
    console.log(`SERVER running in ${process.env.NODE_ENV}
      mode on port  ${PORT}`)
  );