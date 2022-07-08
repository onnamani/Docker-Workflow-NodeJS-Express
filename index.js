const express = require("express");
const { connectToMongo } = require("./db/mongoDB");
const postRouter = require("./routes/postRoutes");

const app = express();


// app.get("/", (req, res) => {
//     res.send("<h2>There you are!!!!</h2>");
// })

app.use(express.json());

//localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 3000;
connectToMongo(app, port);