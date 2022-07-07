const express = require("express");
const { connectToMongo } = require("./db/mongoDB");

const app = express();


app.get("/", (req, res) => {
    res.send("<h2>There you are!!!!</h2>");
})

const port = process.env.PORT || 3000;

connectToMongo(app, port);