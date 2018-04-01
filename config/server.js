const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const multipart = require('connect-multiparty');
const fs = require('fs');

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

app.serverConfig = JSON.parse(fs.readFileSync('./server-config.json', 'utf-8'));

module.exports = app;
