const express = require('express');
const session = require('express-session');
const cors = require('cors');

const routerIndex = require('./routers/index');
const env = require('./config/env');

const app = express();
require('./helpers/apiDocs')(app);
app
  .use(express.urlencoded({ extended: true })) // allows the encoding and reading of the body
  .use(express.json()) //allows the use of json in the body
  .use(session({
    secret: env.getSessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: !env.getDevelopment(), // Secure cookies only if not in development (needed to use Postman)
        httpOnly: true,
    },
  }))
  .use(cors(env.getCors())) // removing restrictions to allow communication with the front (react)
  .use(routerIndex);


module.exports = app;