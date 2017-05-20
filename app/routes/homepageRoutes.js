var database = require("../models");
console.log("homepageRoutes PASS");
module.exports = function(app) {
    var currentUser;
    app.get("/", function(req, res) {
        res.render("home");
    }); //home page route

    //for image upload
    app.get("/image", function(req, res){
        res.render("imageUpload");
    });

    app.get("/users", function(req, res) {
        res.render("users");
    }); //log-in route

    app.get("/users/:username", function(req, res) {
        database.Client.findOne({
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("clients", { contents: data, currentUser: currentUser });
        });
    }); //update profile route
    app.get("/users/:username/dashboard", function(req, res) {
        database.Client.findOne({
            include: [database.Job],
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("dashboard", { contents: data, currentUser: currentUser });
        });
    }); //dashboard route
    app.put("/users/:username", function(req, res) {
        database.Client.update(req.body, {
            where: { username: req.params.username }
        }).then(function() {
            res.redirect("/users/" + req.params.username + "/dashboard");
        });
    });
    
//**********************************************************************
//image upload:
  
var dotenv=require('dotenv');
dotenv.load();

//console.log(process.env.S3_BUCKET);
//console.log(process.env.AWS_ACCESS_KEY_ID);

var multer = require('multer');  // don't forget your terminal installation: npm 

var storage = multer.memoryStorage()

var upload = multer({ storage: storage })

var S3FS = require('s3fs');

// this bucketPath statement gets your bucket from the .env:

var bucketPath = process.env.S3_BUCKET;

var s3Options = {
  region: 'us-east-1',
};

var fsImpl = new S3FS(bucketPath, s3Options);

app.post("/api/new/art", upload.single('fileupload'), function (req, res, next) {

    var fileName = "img-Story"+req.body.StoryId+"-Contrib"+req.body.ContributionId+"."+req.file.mimetype.split("/")[1];
    //console.log(req.file);
    fsImpl.writeFile(fileName, req.file.buffer, "binary", function (err) {
        if (err) throw(err);
        
        console.log("saved !!!!");
        //*** IMPORTANT: Use this code to save the image link to database model and comment the console log.

            // database.Art.create({
            //     art_file: 'https://s3.amazonaws.com/singhtest/'+fileName,
            //     ContributionId: req.body.ContributionId,
            //     StoryId: req.body.StoryId
            // }).then(function(results) {
            //     //res.redirect("/story/"+req.body.StoryId)
            //     console.log("finally !!!");
            // })    
    });
});

//**********************************************************************
    app.post("/users", function(req, res) {
        database.Client.create({
            email: req.body.signup,
            password: req.body.password,
            username: req.body.username,
            isContractor: req.body.contractor
        }).then(function(data) {
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
            include: [database.Client, database.Bid],
            where: { id: req.params.id }
        }).then(function(data) {
            res.render("singleJob", { contents: data, currentUser: currentUser });
        });
    });
    app.get("/jobs/find/:id/:ownerId", function(req, res) {
        database.Bid.findAll({
            include: [database.Client, database.Job],
            where: { JobId: req.params.id }
        }).then(function(data) {
            res.render("singleJobAdmin", { contents: data, currentUser: currentUser });
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
    app.post("/jobs/:id", function(req, res) {
        database.Client.findOne({
            where: { username: req.body.client }
        }).then(function(data) {
            database.Bid.create({
                bid: req.body.amount,
                JobId: req.params.id,
                ClientId: data.id
            }).then(function(data) {
                res.redirect("/jobs/" + req.params.id);
            });
        });
    });
    app.put("/jobs/:id", function(req, res) {
        database.Job.update({
            taken: req.body.accepted,
            ClientId: req.body.worker
        }, { where: { id: req.params.id } }).then(function() {
            database.Client.findOne({
                where: {
                    id: req.body.id
                }
            }).then(function(data) {
                res.redirect("/users/" + data.username + "/dashboard");
            });
        });
    });
}; //ends exports function