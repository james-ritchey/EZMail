var Mailer = require("./mailer.js");
require("dotenv").config();

var interval = null;

var Scheduler = {
    fifteenMinutes: 900000,
    fifteenSeconds: 15000,
    kill: false,
    startTimer: function() {
        interval = setInterval(Scheduler.checkMailList, Scheduler.fifteenSeconds)
    },
    checkMailList: function() {
        var date = new Date();
        var dateAndTime = date.getHours() + ":" + date.getMinutes() + " on " + date.getDate() + " " + date.getMonth();
        console.log("Checking for emails scheduled for " + dateAndTime + "\nKill: " + Scheduler.kill);
        var emailList = [{
            mailOptions: {
                from: 'jim0ritchey@gmail.com',
                to: 'jimritchey@ymail.com',
                subject: 'Mailer test at ' + dateAndTime,
                text: 'That was easy!'
            },
            transportOptions: {
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: 'true',
                port: '465',
                auth: {
                    type: 'OAuth2',
                    user: 'jim0ritchey@gmail.com',
                    //pass: process.env.GMAIL_PASSWORD,
                    clientId: process.env.GMAIL_CLIENTID,
                    clientSecret: process.env.GMAIL_CLIENTSECRET,
                    refreshToken: process.env.GMAIL_REFRESHTOKEN
                }
            }
        }]
        Scheduler.addToDraft(emailList);
        clearInterval(interval);
        interval = setInterval(Scheduler.checkMailList, Scheduler.fifteenSeconds);
    },
    addToDraft: function(emails) {
        console.log("Add any emails scheduled to be sent to the mailer.\nEmails: " + emails);
        Scheduler.sendDraftedMail(emails);
    },
    sendDraftedMail: function(draftedEmails){
        console.log("Sends the drafted mail to the Mailer object to be sent, each email should have a 'mailOptions' and 'transporter' object.");
        draftedEmails.forEach(function(email) {
            console.log(email);
            Mailer.sendMail(email.transportOptions, email.mailOptions);
        })
    }
}

module.exports = Scheduler;