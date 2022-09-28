const {Pool} = require("pg");

const env = require('./env');

const pool = new Pool({
    connectionString: env.getDataBaseUrl(),
    ssl: true,
});

module.exports = pool;