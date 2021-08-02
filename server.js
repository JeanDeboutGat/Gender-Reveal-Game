const express = require("express");
const dotenv = require("dotenv");
const db = require("./database/db");

const app = express();
db.connectDB();