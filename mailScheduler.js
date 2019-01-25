var Mailer = require("./mailer.js");
var db = require("./models");
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
        var currentTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        db.Email.findAll({where: {SendDate: currentTime}}).then(function(dbEmail){
            console.log(dbEmail);
        });
        //Scheduler.addToDraft(emailList);
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