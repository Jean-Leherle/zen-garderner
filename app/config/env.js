require('dotenv').config();

const env = {
  getDevelopment: () => {
    return process.env.DEVELOPMENT === 'true';
  },
  getJwtSecret: () => {
    return process.env.JWT_SECRET || 'klruqy5PKn5k4HhgedR*4Vq4t!VIJQlxOcLVZjps!o9AJ6vu!T';
  },
  getSessionSecret: () => {
    return process.env.SESSION_SECRET || Math.random().toString(36).slice(2);
  },
  getDataBaseUrl: () => {
    return process.env.DATABASE_URL;
  },
  getPort: () => {
    return process.env.PORT||3001;
  },
  getCors: () => {
    return process.env.CORS_DOMAINS?? '*';
  },
  getDocumentationRoute: ()=>{
    return process.env.API_DOCUMENTATION_ROUTE
  }
}

module.exports = env;