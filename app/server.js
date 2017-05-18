//dependencies
var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    method = require("method-override"),
    PORT = process.env.PORT || 8080,
    db = require("./models");

var AWS = require('aws-sdk');
var s3 = require('s3');
var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default 
    s3RetryCount: 3,    // this is the default 
    s3RetryDelay: 1000, // this is the default 
    multipartUploadThreshold: 20971520, // this is the default (20 MB) 
    multipartUploadSize: 15728640, // this is the default (15 MB) 
    s3Options: {
        accessKeyId: "AKIAJ4MAN3QFY5VUOZJA",
        secretAccessKey: "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",
        // any other options are passed to new AWS.S3() 
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
    },
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(method("_method"));
//initalizing the listener
db.sequelize.sync({ force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

//handlebars for rendering html
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//routes 
require("./routes/homepageRoutes")(app);