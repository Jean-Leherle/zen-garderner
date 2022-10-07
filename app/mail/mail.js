
const memberModel = require("../model/memberModel");
const scriptMailTask = require("./scriptMailTask");
const scriptMailWeek = require('./scriptMailWeek');

/*petit récap : 
2 types d'email possible : task et week (les users puvent recevoir les deux)
pour task : les membres peuvent avoir une/des tache qui commence aujourd'hui et une/des taches qui se 
termine dans 3 jours, ils peuvent également n'avoir que l'un des deux cas

pour week : pour week les members peuvent avoir une/des taches qui débutent cette semaine et une tache qui se termine c
cette semaine, il peuvent également avoir les deux. 
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
                    // if the date_begin of the taks and the day date are the same
                    if(d.begin_date.getDate() == nowDay && d.begin_date.getMonth()+1 == nowMonth 
                    && d.begin_date.getFullYear() == nowYear) {
                        let table =[];
                        table.push(d.label, d.email);
                        console.log(table)
                        //appeler de la fonction qui envoie le mail il faut lui passer les apramètres qui sont d.label et d.email
                       // scriptMailTask.sendMailTaskDay(d.email, d.label, `Bonjour votre tache ${d.label} débute aujourd'hui`); 
                    }
                });
                
                const userDateThree = userTaskNotification.filter(d => {
                    // if the date_begin of the taks and the day date are the same, we 
                    if(d.limit_date.getDate()+3 == nowDay && d.limit_date.getMonth()+1 == nowMonth 
                    && d.limit_date.getFullYear() == nowYear) {
                        let table =[];
                        table.push(d.label, d.email);
                        //appeler de la fonction qui envoie le mail il faut lui passer les apramètres qui sont d.label et d.email
                        // scriptMailTask.sendMailTaskEndInThreeDay(); 
                    }
                });
               
            } catch (error) {
                console.log(error);
            }

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
              // Day, month, year of the today's date 
              const nowDay = new Date().getDate();
              const nowMonth = new Date().getMonth()+1;
              const nowYear = new Date().getFullYear();

               // in order to send an email for week notification: we send an email for the task who begin this week
                // compare the day, the month and the year with now +7 days, 
                const userDateNow = userWeekNotification.filter(d => {
                    // if the date_begin of the taks and the day date are the same
                    if(d.begin_date.getDate() == nowDay && d.begin_date.getMonth()+1 == nowMonth 
                    && d.begin_date.getFullYear() == nowYear) {
                        let table =[];
                        table.push(d.label, d.email);
                        //appeler de la fonction qui envoie le mail il faut lui passer les paramètres qui sont d.label et d.email
                        // scriptMailTask.sendTaskMail(); 
                    }
                });

                const userDate = userWeekNotification.filter(d => {
                    // if the date_begin of the taks and the day date are the same
                    if(d.limit_date.getDate()+10 == nowDay && d.limit_date.getMonth()+1 == nowMonth 
                    && d.limit_date.getFullYear() == nowYear) {
                        let table =[];
                        table.push(d.label, d.email);
                        //appeler de la fonction qui envoie le mail il faut lui passer les paramètres qui sont d.label et d.email
                        // scriptMailWeek.sendMailTaskEndInThreeDay(); 
                    }
                });

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

             //envoyer les 4 types de mail. 

             //weekMail() // taskMail () 
                  
         } catch (error) {
             console.log(error);
         }

     }

   },
};


module.exports = mail; 
//mail.accessBdd(); 
mail.taskMail()