const express = require('express');
const app = express();
const cors = require('cors');

const sessionRouter = require('./routers/sessionRouter');

app
  .use(express.urlencoded({ extended: true })) // permet l'encodage et la lecture du body
  .use(express.json()) //permet l'utilisation des json dans le body
  .use(cors(process.env.CORS_DOMAINS ?? '*')) // Levé de la restriction CORS pour permettre la communication avec le front React.
  .use(sessionRouter);

module.exports = app;