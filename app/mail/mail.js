
const memberModel = require("../model/memberModel");
const {sendMail} = require("./configMail");


const mail = {
    taskMail: async () => {
        // taskMail 
        // test of the db 
        const dbOk = await memberModel.findAll();

        // if db = ok, launching of the verification in order to send the mail 
        if (dbOk) {
            try {
                //find users who want receive the task_notification and who have tasks 
                const userTaskNotification = await memberModel.findUserTaskNotificationTrue(); 
                console.log("task", userTaskNotification)

                if(!userTaskNotification) {
                    return
                };
        
                // Day, month, year of the today's date 
                const nowDay = new Date().getDate();
                const nowMonth = new Date().getMonth()+1;
                const nowYear = new Date().getFullYear();

                //in order to send a day email for task notification
                // compare the day, the month and the year with now
                const userToSendMail = userTaskNotification.filter(user => {
                    // if the date_begin of the taks and the day date are the same
                    user.taskTextList = []
                        
                    for (const task of user.tasks){
                        const dateBegin = new Date(task.begin_date);
                        if(dateBegin.getDate()=== nowDay 
                        && dateBegin.getMonth()+1 === nowMonth 
                        && dateBegin.getFullYear() === nowYear){ //if task start today
                            user.taskTextList.push(`A partir d'aujourd'hui vous pouvez réaliser : ${task.label} jusqu'au ${new Date(task.limit_date).toLocaleDateString()}, ${'https://zen-gardener.netlify.app/fiches/'+task.sheet_id}`) 
                        }
                        
                        const dateLimit = new Date(task.limit_date);
                        if(dateLimit.getDate()=== nowDay+3
                        && dateLimit.getMonth()+1 === nowMonth 
                        && dateLimit.getFullYear() === nowYear){ // if task end in three day                                                         
                            user.taskTextList.push(`Rappel, dans trois jours votre tache : ${task.label} se termine le ${new Date(task.limit_date).toLocaleDateString()}, ${'https://zen-gardener.netlify.app/fiches/'+task.sheet_id}`)              
                        } 
                    }
                    
                    return (user.taskTextList.length>0);
                })

                userToSendMail.forEach((user)=>{
                    let text = `Bonjour ${user.pseudo}, votre jardin vous attend : `
                    user.taskTextList.forEach((taskText)=>{
                        text+= `
                        ${taskText}`                        
                    })
                    text+= ` 
                    Rendez vous sur le site de Zen Gardener  https://zen-gardener.netlify.app/  pour modifier votre profil` 
                    
                    sendMail(user.email, `[zen-gardener] Vous avez ${user.tasks.length} taches à réaliser`, text)
                })


            } catch (error) {
                console.log(error);
            }

        }
    },

    weekMail: async () => {
        // weekMail, this function send an email 
        // test of the db 
        const dbOk = await memberModel.findAll();

        if (dbOk) {
            try {
                //find users who want receive the task_notification and who have tasks 
                let userWeekNotification = await memberModel.findUserWeekNotificationTrue();
                console.log("week", userWeekNotification) 
        
                // Day, month, year of the today's date 
                const nowDay = new Date().getDate();
                const nowMonth = new Date().getMonth()+1;
                const nowYear = new Date().getFullYear();
                if(!userWeekNotification) {
                    return 
                };
                //in order to send a day email for task notification
                // compare the day, the month and the year with now

                console.log(userWeekNotification);
                const userToSendMail = userWeekNotification.filter(user => {
        
                    user.taskTextList = []
                        
                    for (const task of user.tasks){
                        const dateBegin = new Date(task.begin_date);
                        if(dateBegin.getDate()=== nowDay 
                        && dateBegin.getMonth()+1 === nowMonth 
                        && dateBegin.getFullYear() === nowYear){ //if task start today
                            user.taskTextList.push(`A partir de cette semaine vous pouvez réaliser : ${task.label} jusqu'au ${new Date(task.limit_date).toLocaleDateString()}, ${'https://zen-gardener.netlify.app/fiches/'+task.sheet_id}`) 
                        }
                        
                        const dateLimit = new Date(task.limit_date);
                        if(dateLimit.getDate()=== nowDay+10
                        && dateLimit.getMonth()+1 === nowMonth 
                        && dateLimit.getFullYear() === nowYear){ // if task end in ten days                                                        
                            user.taskTextList.push(`Rappel, voici vos taches qui se terminent : ${task.label} se termine le ${new Date(task.limit_date).toLocaleDateString()}, ${'https://zen-gardener.netlify.app/fiches/'+task.sheet_id}`)              
                        } 
                    }
                    
                    return (user.taskTextList.length>0);
                })
                userToSendMail.forEach((user)=>{
                    let text = `Bonjour ${user.pseudo}, votre jardin vous attend : `
                    user.taskTextList.forEach((taskText)=>{
                        text+= `
                        ${taskText}`                        
                    })
                    text+= ` 
                    Rendez vous sur le site de Zen Gardener  https://zen-gardener.netlify.app/  pour modifier votre profil` 
                    
                   sendMail(user.email, `[zen-gardener] Vous avez ${user.tasks.length} taches à réaliser cette semaine`, text)
                })

            } catch (error) {
                console.log(error);
            }

        }

}
}


module.exports = mail; 

/* const job = schedule.scheduleJob('42 * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
  }); */
  

mail.taskMail();
mail.weekMail();