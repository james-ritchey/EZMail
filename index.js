var Mailer = require("./mailer.js");
var Imap = require("./imap");
require("dotenv").config();



var date = new Date();
var dateAndTime = date.getHours() + ":" + date.getMinutes() + " on " + date.getDate() + " " + date.getMonth();

var mailOptions = {
    from: 'jim0ritchey@gmail.com',
    to: 'jimritchey@ymail.com',
    subject: 'Mailer test at ' + dateAndTime,
    text: 'That was easy!'
};

var transportOptions = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
        //type: 'OAuth2',
        user: 'jim0ritchey@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
        /*clientId: process.env.GMAIL_CLIENTID,
        clientSecret: process.env.GMAIL_CLIENTSECRET,
        refreshToken: process.env.GMAIL_REFRESHTOKEN*/
    }
}

Mailer.sendMail(transportOptions, mailOptions);