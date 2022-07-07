const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("../config/config");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

function connectToMongo(app, port) {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
                    app.listen(port, () => console.log("Sucessfully connected to DB"))
                })
                .catch((e) => console.log(e));
}

module.exports = { connectToMongo }

