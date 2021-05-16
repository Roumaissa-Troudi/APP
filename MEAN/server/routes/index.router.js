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
router.get('/table',jwtHelper.verifyJwtToken, ctrlemployee.table);
router.get('/workstatus',jwtHelper.verifyJwtToken, ctrlemployee.workstatus);
router.get('/employeetable',jwtHelper.verifyJwtToken, ctrlemployee.tableEmployee);
router.post('/workstation',jwtHelper.verifyJwtToken,ctrlemployee.workstation);
router.post('/work',jwtHelper.verifyJwtToken, ctrlemployee.work);
router.post('/configprofile',jwtHelper.verifyJwtToken, ctrlemployee.configProfile);
router.post('/postnotif',jwtHelper.verifyJwtToken, ctrlemployee.postnotification);
router.get('/getnotif',jwtHelper.verifyJwtToken, ctrlemployee.getnotif);


module.exports = router;