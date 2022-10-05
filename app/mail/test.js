const nodemailer = require("nodemailer");
const env = require("../config/env");

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
    to: "clothilde.drouot48@gmail.com",
    subject: "Bienvenue chez Zengardener",
    text:"Bonjour, nous vous souhaitons la bienvenue sur notre application"
 };

 mailTransporteur.sendMail(options, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}

sendMail("clothilde.drouot48@gmail.com", "Bienvenue chez Zengardener",  "Bonjour, nous vous souhaitons la bienvenue sur notre application");