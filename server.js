const env = require("./app/config/env");
const app = require("./app");
//const debug = require("debug")("SERVER");
const mail = require('./app/mail/mail');

const port = env.getPort();
app.set(mail)
app.listen(port, () => {
  //debug
  console.log(`Example app listening on port ${port}`);
});