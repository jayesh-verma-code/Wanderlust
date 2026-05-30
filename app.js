require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');

app.get('/', (req, res) => {
    res.send("hello world");
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  app.listen(8080, () => {
    console.log("Server running on 8080");
  });
};

main()
.then(() => console.log("DB connected"))
.catch(err => console.log(err));
