require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport").passportLocalStrategy(passport);

// connect flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.flash("user-info");
  next();
});

// connecting to mongodb
mongoose
  .connect(
    "mongodb+srv://m001-student:<password>@sandbox.0syyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err.message));

// auth routes
app.use("/", require("./routes/auth"));
app.use("/api/invoice", require("./routes/invoice"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
