const env = require("./app/config/env");
const app = require("./app");

const mail = require('./app/mail/mail');
const schedule = require('node-schedule');


const port = env.getPort();

app.set(mail);
const everyDay = schedule.scheduleJob('* 9 * * *', mail.taskMail);

const everyWeek = schedule.scheduleJob(' * 10 * * 1', mail.weekMail);

app.listen(port, () => {
  //debug
  console.log(`Example app listening on port ${port}`);
});