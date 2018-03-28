const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const multipart = require('connect-multiparty');

const app = express();

app.use(bodyParser.json({ limit: '15mb' }));
app.use(multipart());
app.use(expressValidator());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

module.exports = app;
