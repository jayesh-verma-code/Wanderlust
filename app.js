require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const Listing = require('./models/listing.js');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}))

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

//Listings Index Route
app.get('/listings', async(req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {allListings});
});

//New Listing Route
//(this route is written above the "Show" route otherwise "/new" will be identified as "/:id")
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

//Listings Show Route
app.get('/listings/:id', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', {listing});
});

//Listings Create Route
app.post('/listings', async(req, res) => {
    // let {title, description, price, location, image, country} = req.body;
    let listing = req.body;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect('/listings');
});

