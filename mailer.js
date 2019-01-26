const nodemailer = require("nodemailer");

var Mailer = {
    /**
     * Uses the passed transporterInfo and mailOptions to send
     * the email to the recipients
     * @param {*} transporterInfo 
     * @param {*} mailOptions 
     */
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