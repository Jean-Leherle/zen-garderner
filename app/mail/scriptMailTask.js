const nodemailer = require("nodemailer");
const env = require("../config/env");

    

// function for sending email for task 
const sendMailTaskDay = (to, subject, message) => {
    let mailTransporteur = nodemailer.createTransport({
        service: env.getEmailService(), 
        auth : {
            user : env.getEmailAdress(),
            pass : env.getEmailPassword()
        }
    });

//text of the email
 let textTaskNotification  = {
    from : env.getEmailSender(), 
    to: " à personnaliser avec l'email du member",
    subject: "à personnaliser avec le label de la tache",
    text:"Bonjour, à personnaliser avec le label de la tache et la fiche qui corresponds "
 };

 // envoie du message avec les erreurs

 mailTransporteur.sendMailTask(textTaskNotification, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}




