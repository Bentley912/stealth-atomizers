var database = require("../models");
module.exports = function(app) {

    app.get("/users/:username/postJob", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("postJob", { contents: data });
        });
    });

    app.post("/users/:username/dashboard", function(req, res) {
        database.Job.create({
            name: req.body.title,
            description: req.body.description,
            ClientId: req.body.ClientId
        }).then(function(data) {

            res.redirect("/users/" + req.params.username + "/dashboard");
        });
    });
    app.get("/jobs/:id", function(req, res) {
        database.Job.findOne({
            include: [database.Client],
            where: { id: req.params.id }
        }).then(function(data) {
            res.render("singleJob", { contents: data });
        });
    });
    app.get("/jobs", function(req, res) {
        database.Job.findAll({
            include: [database.Client]
        }).then(function(data) {
            res.render("allJobs", { contents: data });
        });
    });
};