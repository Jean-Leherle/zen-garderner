const env = require("./app/config/env");
const app = require("./app");
//const debug = require("debug")("SERVER");

const nodemailer = require("nodemailer");

const sendMail = (to, subject, message) => {
    let mailTransporteur = nodemailer.createTransport({
    service: env.getEmailService(), 
    auth : {
        user : env.getEmailAdress(),
        pass : env.getEmailPassword()
    }
});
 let options = {
    from : env.getEmailSender(), 
    to: "eric.gabrieli@hotmail.fr",
    subject: "Bienvenue chez Zengardener",
    text:"Bonjour, nous vous souhaitons la bienvenue sur notre application"
 };

 mailTransporteur.sendMail(options, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}

sendMail("eric.gabrieli@hotmail.fr", "Bienvenue chez Zengardener",  "Bonjour, nous vous souhaitons la bienvenue sur notre application");

const port = env.getPort();
app.listen(port, () => {
  //debug
  console.log(`Example app listening on port ${port}`);
});