const nodemailer = require("nodemailer");

var Mailer = {
    
    sendMail: function(transporterInfo, mailOptions) {
        var transporter = nodemailer.createTransport(transporterInfo);
            transporter.sendMail(mailOptions, function(err, info) {
            if(err) {
                console.log(err);
            }
            else {
                console.log("Email sent: " + JSON.stringify(info));
            }
        });
    }
}

module.exports = Mailer;