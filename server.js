const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();

//body parser middleware
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);
app.use(bodyParser.json())

//DB config
const db = require("./config/keys").mongoURI

//Connect to a DB
mongoose.connect(
    db, { useNewUrlParser:true }
)
.then(()=> console.log("Mongo DB Successfully connected"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// // Passport config
// require("./config/passport")(passport);
// Routes
app.use("/api/users", users);


// process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.port || 8081;

app.listen(port, () => console.log('Server up and running at ${port} !'))