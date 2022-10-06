// id de mes bon users : 42 et 43
const memberModel = require("../model/memberModel");
const configMail = require("./configMail")

const mail = {
    // verification db access 
    // accessBdd: async()=> {
    //     const user = await memberModel.findAll();
        
    // },
    taskMail: async () => {
        // test of the db 
        const dbOk = await memberModel.findAll();

        // if db = ok, launching of the verification in order to send the mail 
        if (dbOk) {
            try {
                //find users who want receive the task_notification and who have tasks 
                const userTaskNotification = await memberModel.findUserTaskNotificationTrue(); 
                // récupération de la begin_date 
                const beginDate =  userTaskNotification.find(begin_date => begin_date.begin_date == now.getDate());
                console.log(beginDate);

                //if et for each
    
            } catch (error) {
                console.log(error);
            }
        
            // envoie la week notification tous les lundis donc il faut selectionner le lundi 
            
            // lancement de la fonction sendMail 

        }
       
        
    },
    

    //taskWeekMail: async () => {
        //récuperer les users qui ont mis true aux deux 
       // try {
            //récupération des users qui ont mis true à la weeknotification 

            // récupération des users qui ont mis true à la task notification 
            
      //  } catch (error) {
           // console.log(error);
     //   }

  //  },

};


module.exports = mail; 
//mail.accessBdd(); 
mail.taskMail()