require('dotenv').config({ path: "../.env" });
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
};

main()
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

 // initDB();