const express = require('express');
const app = express();
const router = require('./routers');
const cors = require('cors');
// app.use(express.json());
app.use(express.json());

// permet l'utilisation de la méthode post avec lecture du body
app.use(express.urlencoded({ extended: true }));

// Levé de la restriction CORS pour permettre la communication avec le front React.
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;