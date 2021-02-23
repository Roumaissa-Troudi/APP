const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passportLocalMongoose = require('passport-local-mongoose');


var employeeSchema= new mongoose.Schema({
    fullName:{
        type: String,
        required: 'Full name can\'t be empty'
    },
    email:{
        type: String,
        required: 'Email can\'t be empty',
        unique:true
    },
    password:{
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Passsword must be at least 4 Character long']
    },
    role:{
        type: String
    },
    department:{
        type: String
    },
    workstatus: {
        type:Boolean, default: false 
    },
    phoneNumber: {
        type: Number
    },
    
    saltSecret: String
});
employeeSchema.plugin(passportLocalMongoose);

employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


employeeSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err,hash) => {
            this.password=hash;
            this.saltSecret=salt;
            next();
        });
    });
});

employeeSchema.methods.verifyPassword = function (password) {
     return bcrypt.compareSync(password, this.password);
}

employeeSchema.methods.generateJwt = function () {
    return jwt.sign({_id:this._id },
         process.env.JWT_SECRET, 
         {
           expiresIn: process.env.JWT_EXP
         });
}

mongoose.model('EmployeesLogin', employeeSchema);