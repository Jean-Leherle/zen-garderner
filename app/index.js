const express = require('express');
const session = require('express-session');
const cors = require('cors');

const env = require('./config/env');
const sessionRouter = require('./routers/sessionRouter');

const app = express();
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
  .use(cors(env.getCors())) // Levé de la restriction CORS pour permettre la communication avec le front React.
  .use(sessionRouter);

module.exports = app;