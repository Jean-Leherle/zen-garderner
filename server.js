require("dotenv").config();
//const debug = require("debug")("SERVER");

const app = require("./app");

const port = process.env.PORT;
app.listen(port, () => {
  //debug
  (`Example app listening on port ${port}`);
});