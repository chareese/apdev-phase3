require('dotenv').config(); 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
// const passport= require("passport") 
// const passportLocalMongoose = require("passport-local-mongoose") 


// npm init -y
// npm install ejs express express-session body-parser mongoose  connect-mongodb-session path fs

const fileUpload = require('express-fileupload');
app.use(
    fileUpload()
);

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://charissevaldez:<password>@cluster0.akuroap.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then((res) => {
    console.log("MongoDB connected");
});


const store = new mongoDBSession({
    uri: "mongodb://localhost:27017/dlsuBTPdb",
    collection: "mySessions"
})

// const usersSchema = new mongoose.Schema({
//     email: String,
//     password: String
// })

// usersSchema.plugin(passportLocalMongoose)

// const User = new mongoose.model("User", usersSchema)

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(session({
        // secret: "CCAPDEVMCO2SecretCookieSigner",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require("./routes/route.js")
app.use('/', route);

app.listen(3000, function () {
    console.log("Server started on port 3000");
});