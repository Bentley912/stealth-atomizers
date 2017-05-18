var database = require("../models");
console.log("homepageRoutes PASS");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    });

    //for image upload
    app.get("/image", function(req, res){
        res.render("imageUpload");
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
    app.get("/users/:username/dashboard", function(req, res) {
        database.Client.findOne({
            include: [database.Job],
            where: { username: req.params.username }
        }).then(function(data) {
            res.render("dashboard", { contents: data });
        });
    });
    app.put("/users/:username", function(req, res) {
        database.Client.update(req.body, {
            where: { username: req.params.username }
        }).then(function() {
            res.redirect("/users/" + req.params.username + "/dashboard");
        });
    });
    
//**********************************************************************
    //image upload:
    app.post("/users/image/", function(req, res){
        var AWS = require('aws-sdk');
        var s3 = require('s3');
        var awsS3Client = new AWS.S3();
        var options = {
        s3Client: awsS3Client,
        // more options available. See API docs below. 
        };
        var client = s3.createClient(options);
    

    var params = {
        localFile: req.body.pImage,
 
        s3Params: {
            Bucket: "stealthatomizers",
            Key: "some/remote/file",
        // other options supported by putObject, except Body and ContentLength. 
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
        },
    };

    var uploader = client.uploadFile(params);
    uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
    });

    uploader.on('progress', function() {
        console.log("progress", uploader.progressMd5Amount,
        uploader.progressAmount, uploader.progressTotal);
    });

    uploader.on('end', function() {
        console.log("done uploading");
    });
});
//**********************************************************************
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
            res.render("postJob", { contents: data });
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
}; //ends exports function