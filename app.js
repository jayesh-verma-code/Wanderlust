require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const Listing = require('./models/listing.js');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(8080, () => {
    console.log("Server running on 8080");
  });
};

main()
.then(() => console.log("DB connected"))
.catch(err => console.log(err));


//===========API=============

app.get('/', (req, res) => {
    res.send("Welcome to Wanderlust");
});

app.get('/listings', async(req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {allListings});
});

