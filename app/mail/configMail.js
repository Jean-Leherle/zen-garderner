const nodemailer = require("nodemailer");
const env = require("../config/env");

// réalisation d'un premier test pour l'envoie d email :soucis avec gmail, j'ai vu sur nodemailer, qu'il y'a un truc spécial pour gmail
// test sur outlook ok mais fini dans les indésirables 
const sendMail = (to, subject, message) => {
    // création d'un transporteur : c'est NOTRE MAIL 
    // il a des choses à ajouter 
    let mailTransporteur = nodemailer.createTransport({
    service: env.getEmailService(), 
    auth : {
        user : env.getEmailAdress(),
        pass : env.getEmailPassword()
    }
});
// options pour les mails du texte et du sujet 
// TODO personnalisation des message en fonction du type de notification
 let textWeeekNotification  = {
    from : env.getEmailSender(), 
    to: "clothilde.drouot48@gmail.com",
    subject: "Notification de la semaine ",
    text:"Bonjour, voici la notitication de la semaine "
 };

 // envoie du message avec les erreurs

 mailTransporteur.sendMail(textWeeekNotification, (error, info) => {
    if (error) console.log(error)
    else console.log(info)
 })
}

//appelle de la foinction
//sendMail("clothilde.drouot48@gmail.com", "Bienvenue chez Zengardener",  "Bonjour, nous vous souhaitons la bienvenue sur notre application");



