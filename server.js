require("dotenv").config();
var express = require("express");
var moment = require("moment");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


// Routes

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
var Scheduler = require("./mailScheduler");
Scheduler.addEmail({
        from: 'jim0ritchey@gmail.com',
        to: 'jimritchey@ymail.com',
        subject: 'Mailer test with db',
        text: 'That was easy!',
        send_date: moment(new Date(), "MM DD YYYY, HH:mm")
});
Scheduler.startTimer();
module.exports = app;