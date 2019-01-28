var Imap = require('imap'),
    inspect = require('util').inspect;
var fs = require("fs");
require("dotenv").config();

var imap = new Imap({
  user: 'jim0ritchey@gmail.com',
  password: process.env.GMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

function openInbox(cb) {
    imap.openBox("INBOX", true, cb);
}

imap.once("ready", function() { 
    openInbox(function(err, box) {
        if (err) throw err;
        imap.search([ "UNSEEN", ["SINCE", "January 22, 2019"] ], function(err, results) {
            if (err) throw err;
            var f = imap.fetch(results, { bodies: "" });
            f.on("message", function(msg, seqno) {
                var email = {
                    to: "",
                    from: "",
                    body: "",
                    subject: ""
                };
                msg.on("body", function(stream, info) {
                    console.log(stream);
                });
                msg.once("attributes", function(attrs) {
                });
                msg.once("end", function() {
                });
            });
            f.once("error", function(err) {
                console.log("Fetch error: " + err);
            });
            f.once("end", function() {
                console.log("Done fetching all messages!");
                imap.end();
            });
        });
    });
});

imap.once("error", function(err) {
console.log(err);
});

imap.once("end", function() {
console.log("Connection ended");
});

imap.connect();