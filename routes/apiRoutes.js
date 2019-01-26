var db = require("../models");

module.exports = function(app) {

    app.get("/api/emails", function(req, res) {
        db.email.findAll({}).then(function(dbemail){
            res.json(dbemail);
        });
    });

    app.post("/api/email", function(req, res) {
        db.email.create({
            To: req.body.To,
            From: req.body.From,
            Cc: req.body.Cc,
            Subject: req.body.Subject,
            Body: req.body.Body,
            SendDate: req.body.SendDate
        }).then(function(dbemail){
            res.json(dbemail);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.put("/api/email", function(req, res){
        db.email.create({
            To: req.body.To,
            From: req.body.From,
            Cc: req.body.Cc,
            Subject: req.body.Subject,
            Body: req.body.Body,
            SendDate: req.body.SendDate
        },{
            where: {
                id: req.body.id
            }
        }).then(function(dbemail){
            res.json(dbemail);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.delete("/api/email/:id", function(req, res){
        db.email.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbemail){
            res.json(dbemail);
        });
    });
}

