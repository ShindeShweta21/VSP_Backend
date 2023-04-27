const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;

dotenv.config();
require("./db/conn.js");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(require("./route/upload.js"));
app.use(require("./route/search.js"));
app.use(require("./route/register.js"));
app.use(require("./route/signin.js"));

const User = require("./model/user.js");
const Video = require("./model/video.js");

const middleware = (req, res, next) => {
  console.log("Middleware");
  next();
};

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on Port ${PORT}`);
});
