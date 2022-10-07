const nodemailer = require("nodemailer");
const env = require("../config/env");

// function for sending email for task 
sendMailTaskDay = (to, subject, message) => {
    let transporter = nodemailer.createTransport({
        service: env.getEmailService(), 
        auth : {
            user : env.getEmailAdress(),
            pass : env.getEmailPassword()
        }
    });

//text of the email : the task begin today 
 let optionsTaskNotificationDay  = {
    from : env.getEmailSender(), 
    to,
    subject,
    text,
 };

 // to see the errors

 transporter.sendMail(optionsTaskNotificationDay, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}; 




const sendMailTaskEndInThreeDay = (to, subject, message) => {
    let mailTransporteur = nodemailer.createTransport({
        service: env.getEmailService(), 
        auth : {
            user : env.getEmailAdress(),
            pass : env.getEmailPassword()
        }
    });


//text of the email : the task end ind three days 
 let textTaskNotificationEndInThreeDay  = {
    from : env.getEmailSender(), 
    to: " à personnaliser avec l'email du member",
    subject: "Vous avez une tache qui se termine dans 3 jours",
    text:"Bonjour, votre tache ... se termine aujourd'hui. "
 };

 // to see the error

 mailTransporteur.sendMailTasEndInThreeDay(textTaskNotificationEndInThreeDay, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })

}

module.exports = {sendMailTaskDay}



