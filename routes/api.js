var express = require('express');
var router = express.Router();

var Account = require('../server_controllers/accountController');
var Employee = require('../server_controllers/employeeController');

//Account Routes

router.get('/accounts', Account.displayAccounts);
router.get('/account/create', Account.accountCreateGET);

router.post('/account/create', Account.accountCreatePOST);

//Employee Routes

router.get('/employees', Employee.displayEmployees);
router.get('/employee/create', Employee.employeeCreateGET);

router.post('/employee/create', Employee.employeeCreatePOST);

router.get('/employee/:id', Employee.employeeDetailsGET);

module.exports = router;
