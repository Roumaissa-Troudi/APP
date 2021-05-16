const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var Employee = mongoose.model("EmployeesLogin");

passport.use(
  new localStrategy({ usernameField: "email" }, (username, password, done) => {
    Employee.findOne({ email: username }, (err, user) => {
      console.log("agahg", user.verifyPassword(password));
      if (err) return done(err);
      else if (!user)
        return done(null, false, { message: "invalid Email or Password " });
      else {
        user
          .verifyPassword(password)
          .then((verif) => {
            if (verif) return done(null, user);
            else return done(null, false, { message: " invalid Email or Password" });
          })
          .catch((err) => {
            return done(null, false, { message: "invalid Email or Password" });
          });
      }
    });
  })
);
