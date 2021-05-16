require('./config/config');
require('./models/db');
require('./config/passportConfig');
const {updateAllEmployees} =require("./login/controllers/employee.controller")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');


var app= express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(passport.initialize());
app.use(passport.session());
const schedule = require('node-schedule');

// const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
// rule.tz = 'Etc/UTC';

// const job = schedule.scheduleJob(rule,updateAllEmployees);

app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`));

