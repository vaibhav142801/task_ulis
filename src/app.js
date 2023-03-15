const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const app = express();
const multer = require("multer");


app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use('/', routes);


app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
