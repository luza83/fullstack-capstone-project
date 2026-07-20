// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";


async function connectToDatabase() {
    try {
        const client = new MongoClient(url);

        await client.connect();
        console.log('Connection successful');

        const dbInstance = client.db(dbName);

        return dbInstance;

    } catch (error) {
        console.log("DB connection failed:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
