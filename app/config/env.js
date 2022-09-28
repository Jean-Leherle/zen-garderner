require('dotenv').config();

const env = {
  getJwtSecret: () => {
    return process.env.JWT_SECRET || 'nipmportequoi_hgjfdshfjkdhjsfhsdjk';
  },
  getDataBaseUrl: () => {
    return process.env.DATABASE_URL;
  },
  getPort: () => {
    return process.env.PORT||3001;
  }
}

module.exports = env;