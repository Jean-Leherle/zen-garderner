const express = require('express');
const session = require('express-session');
const cors = require('cors');

const routerIndex = require('./routers/index');
const env = require('./config/env');

const app = express();
require('./helpers/apiDocs')(app);
app
  .use(express.urlencoded({ extended: true })) // permet l'encodage et la lecture du body
  .use(express.json()) // permet l'utilisation des json dans le body
  .use(session({
    secret: env.getSessionSecret(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: !env.getDevelopment(), // Secure cookies only if not in development (needed to use Postman)
        httpOnly: true,
    },
  }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  })
  //.use(cors({ origin: "*" })) // Levé de la restriction CORS pour permettre la communication avec le front React.
  .use(routerIndex);


module.exports = app;