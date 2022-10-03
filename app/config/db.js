const { Client } = require('pg');

const env = require('./env');

const client = new Client({
    connectionString: env.getDataBaseUrl(),
        ssl:{
    rejectUnauthorized: false
}
});
//const client = new Client(env.getDataBaseUrl())
client.connect();

module.exports = client;