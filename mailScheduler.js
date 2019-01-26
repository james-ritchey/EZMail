var Mailer = require("./mailer.js");
var db = require("./models");
var moment = require("moment");
require("dotenv").config();

var interval = null;

var Scheduler = {
    fifteenMinutes: 900000,
    fifteenSeconds: 15000,
    startTimer: function() {
        interval = setInterval(Scheduler.checkMailList, Scheduler.fifteenSeconds)
    },
    /**
     * Checks the database for any emails scheduled to be sent at the current time, then
     * sets the interval for the next check to 15 minutes from then.
     */
    checkMailList: function() {
        var currentTime = moment(new Date());
        console.log("Checking for emails scheduled for " + currentTime.format("MM DD YYYY, HH:mm") + "\n==========================");
        db.Email.findAll({where: {SendDate: currentTime.format("MM DD YYYY, HH:mm")}}).then(function(dbEmail){
            console.log("Emails found\n================================================");
            console.log(dbEmail);
            dbEmail.forEach(function(email){
                Scheduler.addToDraft(email.dataValues);
            });
        }).then(function(){
            clearInterval(interval);
            interval = setInterval(Scheduler.checkMailList, Scheduler.fifteenSeconds);
        });

    },
    /**
     * Adds an email to the database, used for testing
     * @param {*} email 
     */
    addEmail: function(email){
        console.log("\nCreates new email, used for testing\n========================")
        db.Email.create(
            {
                From: email.from,
                To: email.to,
                Subject: email.subject,
                Body: email.text,
                SendDate: email.send_date.format("MM DD YYYY, HH:mm")
            }
        ).then(function(dbEmail){
            console.log(JSON.stringify(dbEmail) + "\n=======================\n");
        });
    },
    /**
     * Builds the mailOptions object using the passed email, then sends it to the sendDraftedMail method
     * @param {*} email 
     */
    addToDraft: function(email) {
        var mailOptions = {
            from: email.From,
            to: email.To,
            subject: email.Subject,
            text: email.Body
        };
        console.log("\nAdd any emails scheduled to be sent to the mailer.\nEmails: " + JSON.stringify(mailOptions) + "\n================================");
        Scheduler.sendDraftedMail(mailOptions);
    },
    /**
     * Finds the user account that corresponds with the sender email, builds the transporter object
     * and sends the info to the Mailer object
     * @param {*} mail 
     */
    sendDraftedMail: function(mail){
        var transporter = {auth: {}};
        db.Account.findAll({where: {email: mail.from}}).then(function(dbAccount){
            var account = dbAccount[0].dataValues;
            transporter.service = account.server;
            if(transporter.service === "gmail"){
                transporter.host = 'smtp.gmail.com';
                transporter.secure = true;
                transporter.port = '465';
            }
            transporter.auth.user = account.email;
            transporter.auth.pass = process.env.GMAIL_PASSWORD;
            console.log(JSON.stringify(transporter));
        }).then(function() {
            console.log("\nSends the drafted mail to the Mailer object to be sent, each email should have a 'mailOptions' and 'transporter' object.");
            Mailer.sendMail(transporter, mail);
        });

    }
}

module.exports = Scheduler;