const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");

const EmployeesLogin = mongoose.model("EmployeesLogin");
const HealthStatus = mongoose.model("healthstatus");

module.exports.register = (req, res, next) => {
  var employee = new EmployeesLogin();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.password = req.body.password;
  employee.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if (err.code == 11000)
        res.status(422).send(["Duplicate email address found."]);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, err) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json(err);
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.home = (req, res, next) => {
  EmployeesLogin.findOne({ _id: req._id }, (err, employee) => {
    if (!employee)
      return res
        .status(404)
        .json({ status: false, message: "User record not found" });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(employee, ["fullName", "email"]) });
  });
};

module.exports.health = (req, res, next) => {
  var health = new HealthStatus();
  health.employee_id = req._id;
  health.employee_name=req.fullName;
  health.employee_email=req.email;
  health.healthvalue = req.body.healthvalue;
  health.date = Date.now().toISOString;
  health.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else return next(err);
  });
};

module.exports.work = (req, res, next) => {
  employee.workstatus=req.body.workstatus
  
  employee.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else return next(err);
  });
};