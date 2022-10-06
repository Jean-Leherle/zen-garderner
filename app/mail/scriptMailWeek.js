const nodemailer = require("nodemailer");
const env = require("../config/env");
 
//utils


// function for sending email for task 
const sendMailWeek = (to, subject, message) => {
    // create transpor 
    let mailTransporteur = nodemailer.createTransport({
    service: env.getEmailService(), 
    auth : {
        user : env.getEmailAdress(),
        pass : env.getEmailPassword()
    }
});

// options pour les mails du texte et du sujet 
// TODO personnalisation des message en fonction du type de notification
 let textTaskNotification  = {
    from : env.getEmailSender(), 
    to:
    subject:
    text:"Bonjour, voici la notitication de la tache "
 };

 // envoie du message avec les erreurs

 mailTransporteur.sendMailTask(textTaskNotification, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}
