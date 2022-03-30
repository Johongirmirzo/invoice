const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const passportLocalStrategy = (passport) => {
  const authenticate = async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { msg: "Email does not exist" });
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { msg: "Password does not match" });
      }
    } catch (err) {
      done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticate));

  //   serializes the user to store in the session
  passport.serializeUser((user, done) => done(null, user.id));
  //   deserializes the user
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};

module.exports = {
  passportLocalStrategy,
};
