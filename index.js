require("dotenv").config();

// @Crossorigin
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

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
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err.message));

// auth routes
app.use("/", require("./routes/auth"));
app.use("/api/invoice", require("./routes/invoice"));

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
console.log("WORKING!!!");
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
