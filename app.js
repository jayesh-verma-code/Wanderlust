require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-Mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require('./schema.js');

const Listing = require("./models/listing.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(8080, () => {
    console.log("Server running on 8080");
  });
}

main()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//===========API=============

app.get("/", (req, res) => {
  res.redirect("/listings");
});

//Listing schema validation middlware
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }else {
        next();
    }
}

//Listings Index Route
app.get("/listings", wrapAsync( async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//New Listing Route
//(this route is written above the "Show" route otherwise "/new" will be identified as "/:id")
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Listings Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//Listings Create Route
app.post("/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // let {title, description, price, location, image, country} = req.body;
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

//Listing Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Listing Update Route
app.put("/listings/:id", 
    validateListing, 
    wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = req.body.listing;
  await Listing.findByIdAndUpdate(id, { ...listing });
  res.redirect(`/listings/${id}`);
}));

//Listing Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

//Page Not Found
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Fount"));
});

//Custom Error Handler
app.use((err, req, res, next) => {
    let {statusCode=400, message="Something went wrong."} = err;
    //res.status(statusCode).send(message);
    res.render('error.ejs', {message, statusCode});
});
