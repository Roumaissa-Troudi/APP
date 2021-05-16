const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const schedule = require('node-schedule');
const EmployeesLogin = mongoose.model("EmployeesLogin");
const HealthStatus = mongoose.model("healthstatus");




module.exports.register = (req, res, next) => {
  var employee = new EmployeesLogin();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.password = req.body.password;
  employee.workstatus = false;
  
  employee.save((err, doc) => {
    console.log(err);
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
    if (err) {
      return res.status(400).json(err);
      console.log(err);
    } else if (user) return res.status(200).json({ token: user.generateJwt() });
    else {
      console.log(err);
      console.log(info);
      console.log(user);
      return res.status(404).json(info);
      console.log(res);
    }
  })(req, res);
};

module.exports.home = (req, res, next) => {
  EmployeesLogin.findOne({ _id: req._id }, (err, employee) => {
    if (!employee)
      return res
        .status(404)
        .json({ status: false, message: "User record not found" });
    else
      return res.status(200).json({
        status: true,
        user: _.pick(employee, ["fullName", "email", "workstatus", "address",
        "country",
        "postalcode",
        "aboutme",
        "supervisor",
        "city",
       "department",
        "role","workstation","notification"]),
      });
  });
};


module.exports.configProfile = (req, res, next) => {
 
  EmployeesLogin.findOneAndUpdate({ _id: req._id }, { address:req.body.address, city:req.body.city, 
    country:req.body.country, postalcode :req.body.postalcode, supervisor :req.body.supervisor, aboutme:req.body.aboutme, role:req.body.role, department:req.body.department},
    {new: true},
    (err,doc)=> {
      if (!err) {
        res.send(doc);
      } else return next(err);
    });
};


module.exports.health = (req, res, next) => {
  console.log(req.body.healthvaluePhy);
  var health = new HealthStatus();
  health.employee_id = req._id;
  health.employee_name = req.fullName;
  health.employee_email = req.email;
  health.healthvaluePhy = req.body.healthvaluePhy;
  health.healthvaluePsy = req.body.healthvaluePsy;

  health.date = Date.now();
  health.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else return next(err);
  });
};

module.exports.healthHistory = (req, res, next) => {
  HealthStatus.find({ employee_id: req._id })
    .sort({ date: -1 })
    .limit(7)
    .exec(function (err, health) {
      if (!err) {
        let formatData = health.map((e) => {
          return {
            healthValuePhy: e.healthvaluePhy,
            healthValuePsy: e.healthvaluePsy,
            date: e.date,
          };
        });
        res.status(200).json({ status: true, healthHistory: formatData });
      } else return next(err);
    });
};

module.exports.work = (req, res, next) => {
  EmployeesLogin.findOne({ _id: req._id }, (err, employee) => {
    employee.workstatus = !employee.workstatus;
    employee.update((err, doc) => {
      if (!err) {
        res.send(doc);
      } else return next(err);
    });
  });
};

module.exports.workstation = (req, res, next) => {
  
  EmployeesLogin.findOneAndUpdate({ _id: req._id }, { workstation :req.body.workstation},{new: true},
    (err,doc)=> {
      if (!err) {
        res.send(doc);
      } else return next(err);
    });
};

module.exports.workstatus = (req, res, next) => {
  EmployeesLogin.findOne({ _id: req._id }, (err, employee) => {
    if (!err) {
      
      value = employee.workstatus;
      return res.status(200).json({ value });
    } else return next(err);
  });
};

module.exports.search = (req, res, next) => {
  var startDate = new Date(new Date().setHours(00, 00, 00));
  var endDate = new Date(new Date().setHours(23, 59, 59));
  var fullname=""
  console.log(startDate);
  console.log(endDate);
  EmployeesLogin.findOne({ _id: req._id }, (err, employee) => {
    if (!err) {
      fullname = employee.fullName;
    console.log(fullname);
    return fullname;
    } else return next(err);
  });
  EmployeesLogin.find({ _id: { $ne: req._id }, workstatus: true,replacement:false}, "_id").exec(
    (err, employeeOk) => {
      if (!err) {
        console.log(employeeOk);
        let formatData1 = employeeOk.map((e) => {
          return e._id;
        });
        console.log(formatData1);
        if (formatData1.length == 0 || formatData1 == null || formatData1 == undefined) {
          res
            .status(404)
            .json({ status: false, message: "no working Replacement found" });
        } else {
          HealthStatus.find(
            {
              date: {
                $gte: startDate,
                $lt: endDate,
              },
              healthvaluePhy: {
                $gte: 0,
                $lt: 5,
              },
              healthvaluePsy: {
                $gte: 0,
                $lt: 5,
              },
              employee_id: { $in: formatData1 },
            },
            "employee_id"
          )
            .sort({ healthvaluePhy: 1, healthvaluePsy: 1 })
            .exec((err, idList) => {
              if (!err) {
                console.log(idList);
                let formatData = idList.map((e) => {
                  return e.employee_id;
                });
                console.log(formatData);
                if (formatData.length == 0 || formatData == null || formatData == undefined) {
                  res
                    .status(404)
                    .json({
                      status: false,
                      message: "no healthy Replacement found",
                    });
                } else {
                  EmployeesLogin.findOneAndUpdate({ _id: formatData[0] }, { notification: " You have be chosen to replace "+ fullname,replacement:true},{new: true})
                  .exec(
                    (err, employee) => {
                                if (err) { return next(err)}
                                else {
                      return res.status(200).json({
                        status: true,
                        replacement: _.pick(employee, [
                          "fullName",
                          "email",
                          "workstatus",
                          "notification"
                        ]),
                      });}
                    }
                  );
                }
              } else next(err);
            });
        }
      } else next(err);
    }
  );
};

module.exports.work = (req, res, next) => {
  EmployeesLogin.findOne({ _id: req._id }, (err, employee) => {
    employee.workstatus = !employee.workstatus;
    employee.save((err, doc) => {
      if (!err) {
        res.send(doc);
      } else return next(err);
    });
  });
};

module.exports.table = (req, res, next) => {
  var startDate = new Date(new Date().setHours(00, 00, 00));
  var endDate = new Date(new Date().setHours(23, 59, 59));

  HealthStatus.find(
    {
      date: {
        $gte: startDate,
        $lt: endDate,
      },
      healthvaluePsy: {
        $gte: 0,
        $lt: 5,
      },
      healthvaluePhy: {
        $gte: 0,
        $lt: 5,
      },
      employee_id: { $ne: req._id },
    },
    "employee_id"
  )
    .sort({ healthvaluePsy: -1 })
    .exec((err, tableList) => {
      if (!err) {
        let formatTable = tableList.map((e) => {
          return e.employee_id;
        });

        if (tableList.length ==0|| tableList == null || tableList == undefined) {
          res
            .status(404)
            .json({ status: false, message: "no healthy Replacement found" });
        } else {
          EmployeesLogin.find({
            _id: { $in: formatTable },
            workstatus: true, replacement:false
          }).exec(function (err, Table) {
            if (!err) {
              let formatList = Table.map((e) => {
                return {
                  fullName: e.fullName,
                  mail: e.email,
                  workstatus: e.workstatus,
                };
              });

              res
                .status(200)
                .json({ status: true, replacementTable: formatList });
            } else return next(err);
          });
        }
      } else return next(err);
    });
};

module.exports.tableEmployee = (req, res, next) => {
  EmployeesLogin.find({}).exec(function (err, Tableemployees) {
    if (!err) {
      let employeeList = Tableemployees.map((e) => {
        return {
          fullName: e.fullName,
          mail: e.email,
          workstatus: e.workstatus,
        };
      });

      res.status(200).json({ status: true, EmployeeTable: employeeList });
      console.log(employeeList);
    } else return next(err);
  });
};

module.exports.updateAllEmployees = () => {
  console.log("updating all employees");
   EmployeesLogin.updateMany({}, { replacement: false },function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }
  });
}

module.exports.postnotification = (req, res, next) => {
  console.log(req.body.mail)
EmployeesLogin.findOneAndUpdate({email: req.body.mail},{notification:"You have be chosen to replace "+ req.body.fullName,replacement:true},{new: true},
  (err,doc)=> {
    if (!err) {
      res.send(doc); 
      console.log(doc);
    } else return next(err);
  });

};

module.exports.getnotif = (req, res, next) => {
  EmployeesLogin.findOne({_id:req._id}).exec(function (err, employee) {
    if (!err) {
      return res.status(200).json({ status: true, notification:employee.notification });
    } else return next(err);
  });
};