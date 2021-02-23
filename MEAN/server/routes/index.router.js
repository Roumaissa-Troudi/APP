const express = require('express');
const router = express.Router();

const ctrlemployee= require('../login/controllers/employee.controller');

const jwtHelper = require ('../config/jwtHelper')

router.post('/register', ctrlemployee.register);
router.post('/authenticate', ctrlemployee.authenticate);
router.get('/dashboard',jwtHelper.verifyJwtToken, ctrlemployee.home);
router.post('/health',jwtHelper.verifyJwtToken, ctrlemployee.health);
router.get('/healtHistory',jwtHelper.verifyJwtToken, ctrlemployee.healthHistory);
router.get('/searchReplacement',jwtHelper.verifyJwtToken, ctrlemployee.search);

router.post('/work',jwtHelper.verifyJwtToken, ctrlemployee.work);



module.exports = router;