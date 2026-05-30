require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

const Listing = require('./models/listing.js');

app.get('/', (req, res) => {
    res.send("hello world");
});

app.get('/testListing', async(req, res) => {
    let sampleListing = new Listing({
        title: "My New Cafe",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });

    await sampleListing.save();
    console.log(`sample was saved`);
    res.send("successful testing");
})

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(8080, () => {
    console.log("Server running on 8080");
  });
};

main()
.then(() => console.log("DB connected"))
.catch(err => console.log(err));
