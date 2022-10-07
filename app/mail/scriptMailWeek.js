const nodemailer = require("nodemailer");
const env = require("../config/env");
 
// function sending email week_notification
const sendMailWeekBeginThisWeek = (to, subject, message) => {
    // create transporter 
    let mailTransporteur = nodemailer.createTransport({
    service: env.getEmailService(), 
    auth : {
        user : env.getEmailAdress(),
        pass : env.getEmailPassword()
    }
});

// options pour les mails du texte et du sujet 
// TODO personnalisation des message en fonction du type de notification
 let textWeekNotificationBeginThisWeek  = {
    from : env.getEmailSender(), 
    to,
    subject,
    text:"Bonjour, à personnaliser avec le label de la tache et la fiche qui corresponds "
 };

 // envoie du message avec les erreurs

 mailTransporteur.sendMailWeek(textWeekNotificationBeginThisWeek, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
};


// function sending email week_notification
const sendMailWeekEndThisWeek = (to, subject, message) => {
    // create transporter 
    let mailTransporteur = nodemailer.createTransport({
    service: env.getEmailService(), 
    auth : {
        user : env.getEmailAdress(),
        pass : env.getEmailPassword()
    }
});

// options pour les mails du texte et du sujet 
// TODO personnalisation des message en fonction du type de notification
 let textWeekNotificationEndThisWeek  = {
    from : env.getEmailSender(), 
    to: " à personnaliser avec l'email du member",
    subject: "à personnaliser avec le ou les label des tache de la semaines",
    text:"Bonjour, à personnaliser avec le label de la tache et la fiche qui corresponds "
 };

 // envoie du message avec les erreurs

 mailTransporteur.sendMailWeek(textWeekNotificationEndThisWeek, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
};

