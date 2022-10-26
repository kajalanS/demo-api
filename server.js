const port = 80;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.cookieParser());
app.use(require("./src/routes"));

app.listen(port);

module.exports = app;
