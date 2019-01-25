var Mailer = require("./mailer.js");
//var Imap = require("./imap");
var Scheduler = require("./mailScheduler");
require("dotenv").config();


Scheduler.checkMailList();
//Mailer.sendMail(transportOptions, mailOptions);