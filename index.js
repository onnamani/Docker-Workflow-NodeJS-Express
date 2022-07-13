const express = require("express");
const { connectToDB } = require("./db/connectToDB");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");
const session = require("express-session");
const { createClient } = require("redis");
let RedisStore = require("connect-redis")(session);

let redisStore;

let redisClient = createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
});

redisClient.connect().then((result) => {
    redisStore = new RedisStore({ client: redisClient })
})

const app = express();

const port = process.env.PORT || 3000;
connectToDB(app, port);


app.use(session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

app.use(express.json());

//localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter);

//localhost:3000/api/v1/users
app.use("/api/v1/users", userRouter);