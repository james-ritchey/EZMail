require("dotenv").config();
var nodemailer = require("nodemailer");

var Mailer = {
  sendMail: function(transporterInfo, mailOptions) {
    var transporter = nodemailer.createTransport({
      service: transporterInfo.service,
      auth: {
        user: transporterInfo.auth.user,
        pass: transporterInfo.auth.pass
      }
    });
    transporter.sendMail(mailOptions, function(err, info) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = Mailer;