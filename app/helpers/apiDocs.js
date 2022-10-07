const expressJSDocSwagger = require('express-jsdoc-swagger');
const env = require('./../config/env')

const options = {
  info: {
    version: '1.0.0',
    title: "API zen gardener",
    description: "Projet d'apo de l'equipe jardinier du dimanche : api d'assistance au jardinage à travers organisation et fiches d'informations",
  },
  baseDir: __dirname,
  // On analyse tous les fichiers du projet
  //filesPattern: ['./../routers/**/*.js', './../errors/*.js', './../model/*.js'],
  filesPattern: ['./../**/*.js'],
  // URL où sera disponible la page de documentation
  swaggerUIPath: env.getDocumentationRoute(),
  // Activation de la documentation à travers une route de l'API
  exposeApiDocs: true,
  apiDocsPath: '/api/docs',
};
// https://brikev.github.io/express-jsdoc-swagger-docs/#/README
/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);