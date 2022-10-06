
const memberModel = require("../model/memberModel");
const scriptMailTask = require("./scriptMailTask");
const scriptMailWeek = require('./scriptMailWeek');

/*petit récap : 
2 types d'email possible : task et week (les users puvent recevoir les deux
pour task 
*/
const mail = {
    // verification db access 
    // accessBdd: async()=> {
    //     const user = await memberModel.findAll()     
    // },
    taskMail: async () => {
        // taskMail :in this function we send a task mail : the task of the day and the task in 3 days 
        // test of the db 
        const dbOk = await memberModel.findAll();

        // if db = ok, launching of the verification in order to send the mail 
        if (dbOk) {
            try {
                //find users who want receive the task_notification and who have tasks 
                const userTaskNotification = await memberModel.findUserTaskNotificationTrue(); 
                //console.log(userTaskNotification);
              
                // Day, month, year of the today's date 
                const nowDay = new Date().getDate();
                const nowMonth = new Date().getMonth()+1;
                const nowYear = new Date().getFullYear();

                //in order to send a day email for task notification
                // compare the day, the month and the year with now
                const userDateNow = userTaskNotification.filter(d => {
                    // if the date_begin of the taks and the day date are the same, we 
                    if(d.begin_date.getDate() == nowDay && d.begin_date.getMonth()+1 == nowMonth 
                    && d.begin_date.getFullYear() == nowYear) {
                        let table =[];
                        table.push(d.label, d.email);
                        //appeler de la fonction qui envoie le mail il faut lui passer les apramètres 
                        //await scriptMailTask.sendTaskMail(); 
                    }
                });           
               
            } catch (error) {
                console.log(error);
            }
        
            
            // lancement de la fonction sendMail 

        }
       
        
    },

    weekMail: async () => {
        // weekMail : in this function we send one mail, an email of week task 
        // test of the db 
        const dbOk = await memberModel.findAll();

        // if db = ok, launching of the verification in order to send the mail 
        if (dbOk) {
            try {
                //find users who want receive the task_notification and who have tasks 
                const userWeekNotification = await memberModel.findUserWeekNotificationTrue(); 
              
                // récupération des taches de la begin_date

    
            } catch (error) {
                console.log(error);
            }

        }

    },
    

    taskWeekMail: async () => {
        // in this function we call the two other function for the member who 
     // test of the db 
     const dbOk = await memberModel.findAll();

     // if db = ok, launching of the verification in order to send the mail 
     if (dbOk) {
         try {
             //find users who want receive the task_notification and who have tasks 
             const userWeekNotification = await memberModel.findUserWeekNotificationTrue(); 
             const userTaskNotification = await memberModel.findUserTaskNotificationTrue();
           
             // récupération des taches de la begin_date

         
 
         } catch (error) {
             console.log(error);
         }
     
         
         // lancement de la fonction sendMail 

     }

   },

};


module.exports = mail; 
//mail.accessBdd(); 
mail.taskMail()