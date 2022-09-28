const env = require("./app/config/env");
//const debug = require("debug")("SERVER");

const app = require("./app");

const port = env.getPort();
app.listen(port, () => {
  //debug
  console.log(`Example app listening on port ${port}`);
});