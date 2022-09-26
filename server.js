require("dotenv").config();
//const debug = require("debug")("SERVER");

const app = require("./app");

const port = process.env.PORT || 3001;
app.listen(port, () => {
  //debug
  console.log(`Example app listening on port ${port}`);
});