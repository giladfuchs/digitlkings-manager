const express = require("express");
const morgan = require("morgan");
const Profile = require("./models/profiles.model");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* "start": "NODE_ENV=dev DEBUG=request:* nodemon app.js"*/

// Middleware
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/index.route"));
app.listen(3004);
