const express = require('express');
const app = express();
const cors = require('cors');
const env = require('./config/env')

const sessionRouter = require('./routers/sessionRouter');
require('./helpers/apiDocs')(app);
app
.use(express.urlencoded({ extended: true })) // permet l'encodage et la lecture du body
.use(express.json()) //permet l'utilisation des json dans le body
.use(cors(env.getCors())) // Levé de la restriction CORS pour permettre la communication avec le front React.
.use(sessionRouter);

module.exports = app;