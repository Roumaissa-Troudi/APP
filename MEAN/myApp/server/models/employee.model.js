const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secret = "GfG";

const passportLocalMongoose = require("passport-local-mongoose");
const { reject } = require("lodash");

var employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Full name can't be empty",
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true,
  },
  password: {
    type: String,
    required: "Password can't be empty",
    minlength: [4, "Passsword must be at least 4 Character long"],
  },
  role: {
    type: String,
  },
  department: {
    type: String,
  },
  workstatus: {
    type: Boolean,
  },
  phoneNumber: {
    type: Number,
  },
});
employeeSchema.plugin(passportLocalMongoose);

employeeSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

employeeSchema.pre("save", function (next) {
  if (this.password.length < 64) {
    const hash = crypto
      .createHmac("sha256", secret)

      // updating data
      .update(this.password)

      // Encoding to be used
      .digest("hex");
    console.log(hash.length);
    this.password = hash;
  }
  next();
});

employeeSchema.methods.verifyPassword = function (password1) {
  return new Promise((resolve, reject) => {
    const hash = crypto
      .createHmac("sha256", secret)

      // updating data
      .update(password1)

      // Encoding to be used
      .digest("hex");
    resolve(this.password == hash);
  });
};

employeeSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("EmployeesLogin", employeeSchema);
