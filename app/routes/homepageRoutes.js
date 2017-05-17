var database = require("../models");
console.log("homepageRoutes PASS");
module.exports = function(app) {
    var currentUser;
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
    //image upload:
    app.put("/users/image/", function(req, res){
        console.log(req.body.pImage);
        // database.Client.update(req.body, {
        //     where: {
        //         username:req.params.username
        //     }
        // }).then(function(){
        //     res.redirect("/users/" + req.params.username + "/dashboard");
        // });
    });


    app.post("/users", function(req, res) {
        database.Client.create({
            email: req.body.signup,
            password: req.body.password,
            username: req.body.username, 
            isContractor: req.body.contractor
        }).then(function(data) {
            if (typeof localStorage === "undefined" || localStorage === null) {
                var LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }

            localStorage.setItem('username', data.username);
            currentUser = localStorage.getItem('username');
            res.redirect("/users/" + data.username);
        });
    });
    app.post("/users/:username/dashboard", function(req, res) {
        database.Job.create({
            name: req.body.title,
            description: req.body.description,
            category: req.body.jobCategory,
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
    app.get("/users/:username/profile", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("profile", { contents: data, currentUser: currentUser });
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
    app.get("/jobs/category/:category", function(req, res) {
        database.Job.findAll({
            where: { category: req.params.category },
            include: [database.Client]
        }).then(function(data) {
            res.render("allJobs", { contents: data, currentUser: currentUser });
        });
    });
}; //ends exports function