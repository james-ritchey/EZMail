var Mailer = require("./mailer.js");
require("dotenv").config();

var mailOptions = {
    from: 'jim0ritchey@gmail.com',
    to: 'jimritchey@ymail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

var transportOptions = {
    service: 'gmail',
    auth: {
        user: 'jim0ritchey@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
}

Mailer.sendMail(transportOptions, mailOptions);