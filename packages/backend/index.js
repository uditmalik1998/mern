require("dotenv").config({ path: __dirname + "/.env" });
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const UserRoutes = require("./routes/user");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorhandle");

const app = express();

// middlewares
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(options));
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5050;

// routes
app.use("/api/v1", UserRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Listening at PORT : ${PORT}`)
        })
    } catch (err) {
        console.log(err);
    }
}

start();