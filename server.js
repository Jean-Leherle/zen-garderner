const env = require("./app/config/env");
const app = require("./app");
//const debug = require("debug")("SERVER");
const mail = require('./app/mail/mail');
const schedule = require('node-schedule');

const port = env.getPort();

app.set(mail);
//const everyDay = schedule.scheduleJob('42 * * * * *', mail.taskMail);

//const everyWeek = schedule.scheduleJob(' 1 * * * * *', mail.weekMail);

app.listen(port, () => {
  //debug
  console.log(`Example app listening on port ${port}`);
});