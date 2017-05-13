var database = require("../models");
console.log("CONTROLLERS pass");
module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    });

    app.get("/users", function(req, res) {
        res.render("users");
    });

    app.get("/users/:username", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("clients", { contents: data });
        });
    });
    app.get("/users/:username/home", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("dashboard", { contents: data });
        });
    });
    app.put("/users/:username", function(req, res) {
        database.Client.update({
            name: req.body.name,
            address: req.body.address,
            contact: req.body.phone
        }, {
            where: { username: req.params.username }
        }).then(function() {
            res.redirect("/users/" + req.params.username + "/home");
        });
    });
    app.post("/users", function(req, res) {
        database.Client.create({
            email: req.body.signup,
            password: req.body.password,
            username: req.body.username
        }).then(function(data) {
            res.redirect("/users/" + data.username);
        });
    });
}; //ends exports function