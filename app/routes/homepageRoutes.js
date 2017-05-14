var database = require("../models");
console.log("homepageRoutes PASS");
var currentUser;
module.exports = function(app) {

    app.get("/", function(req, res) {
        currentUser = undefined;
        res.render("home");
    });

    app.get("/users", function(req, res) {
        currentUser = undefined;
        res.render("users");
    });

    app.get("/users/:username", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("clients", { contents: data, currentUser: currentUser });
        });
    });
    app.get("/users/:username/dashboard", function(req, res) {
        database.Client.findOne({
            include: [database.Job],
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("dashboard", { contents: data, currentUser: currentUser });
        });
    });
    app.put("/users/:username", function(req, res) {
        database.Client.update(req.body, {
            where: { username: req.params.username }
        }).then(function() {
            res.redirect("/users/" + req.params.username + "/dashboard");
        });
    });
    app.post("/users", function(req, res) {
        database.Client.create({
            email: req.body.signup,
            password: req.body.password,
            username: req.body.username
        }).then(function(data) {
            currentUser = data.username;
            res.redirect("/users/" + data.username);
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
    app.get("/users/:username/postJob", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("postJob", { contents: data, currentUser: currentUser });
        });
    });

    app.get("/jobs/:id", function(req, res) {
        database.Job.findOne({
            include: [database.Client],
            where: { id: req.params.id }
        }).then(function(data) {
            res.render("singleJob", { contents: data, currentUser: currentUser });
        });
    });
    app.get("/jobs", function(req, res) {
        database.Job.findAll({
            include: [database.Client]
        }).then(function(data) {
            res.render("allJobs", { contents: data, currentUser: currentUser });
        });
    });
}; //ends exports function