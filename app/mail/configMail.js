const nodemailer = require("nodemailer");
const env = require("../config/env");

// function for sending email for task 
sendMail = (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: env.getEmailService(), 
        auth : {
            user : env.getEmailAdress(),
            pass : env.getEmailPassword()
        }
    });

//text of the email
 let optionsTaskNotificationDay  = {
    from : env.getEmailSender(), 
    to,
    subject, 
    text
 };

 // to see the errors

 transporter.sendMail(optionsTaskNotificationDay, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}; 


module.exports = {sendMail}



