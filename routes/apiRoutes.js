var db = require("../models");
var moment = require("moment");
var momenttz = require("moment-timezone");

module.exports = function (app) {
    momenttz.tz.setDefault("American/New_York");
    app.get("/api/email", function (req, res) {
        db.Email.findAll({}).then(function (dbemail) {
            res.json(dbemail);
        });
    });

    app.post("/api/email", function (req, res) {
        console.log(req.body.SendDate);
        var tempDate = new Date(req.body.SendDate);
        tempDate = moment(tempDate);
        tempDate.hour(4);
        console.log("\nTemp Date: " + tempDate.format("MM DD YYYY, HH:mm"));
        db.Email.create({
            To: req.body.To,
            From: req.body.From,
            Subject: req.body.Subject,
            Body: req.body.Body,
            SendDate: tempDate.format("MM DD YYYY, HH:mm")
        }).then(function (dbemail) {
            res.json(dbemail);
        }).catch(function (err) {
            console.log("Error on the post route");
            res.json(err);
        });
    });

    app.put("/api/email", function (req, res) {
        db.Email.create({
            To: req.body.To,
            From: req.body.From,
            Subject: req.body.Subject,
            Body: req.body.Body,
            SendDate: req.body.SendDate
        }, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbemail) {
                res.json(dbemail);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/api/email/:id", function (req, res) {
        db.Email.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbemail) {
            res.json(dbemail);
        });
    });
}

