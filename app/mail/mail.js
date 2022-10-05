// test de l'envoi d'un mail réussi mais il arrive automatiquement dans les indésirables 
// archtitecture pour l'envoi des mails 
//conditions : n'envoyer des mails que pour les utilisateurs qui ont demandé une notification par mail (pour les week et les taches)
// member doit avoir mis true 


const memberModel = require("../model/memberModel");

const mail = {
    weekMail: async () => {
        //récupérer les user qui ont mis true 
        try {
            const userWeekNotification = await memberModel.findUserWeekNotificationTrue(); 
            console.log(userWeekNotification);
            
        } catch (error) {
            console.log(error);
        }


        // envoyer le mail à tous ceux qui ont true 
        // lancement de la deuxième finction
        
    },


    taskMail: async () => {
        try {
            // récuperation des taches et des users qui ont mis true à la tache notification 
            const userTaskNotification = await memberModel.findUserWeekNotificationTrue(); 
        } catch (error) {
            
        }

    },

    taskWeekMail: async () => {
        //récuperer les users qui ont mis true aux deux 

    },

};


module.exports = mail; 