const mongoose = require("mongoose");
const constants = require("../config/constants");
const fs = require("fs");
const readline = require("readline");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected:${conn.connection.host}`);
    } catch (error) {
        console.error(`Connection failed: ${error}`);
        process.exit(1);
    }
};


const createData = (filePath) => {
    processLineByLine(filePath);
};

async function processLineByLine(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
    });
    var namesCount = 0;
    for await (const line of rl) {
        const firstName = line.split(" ")[0];
        namesCount += 1;
        if (namesCount <= constants.NAMES_LIMIT) {
            saveName(firstName);
        }
    }
}

const saveName = (firstName) => {
    new FirstName({ firstName: firstName }).save((err, data) => {
        if (err) throw err;
    });
};

module.exports = { connectDB , createData };
