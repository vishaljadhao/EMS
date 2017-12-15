var Employee = require('../data_access/models/employee');
var Account = require('../data_access/models/account');

const async = require('async');

EmployeeModule = {};

//Display All Employees
EmployeeModule.displayEmployees = function(req,res,next) {
    Employee.find()
    .populate('accountName')
    .sort('name')
    .exec(function(err, allEmployees) {
        if(err) {
            res.send(err);
        }else {
            res.render('employees', {title:'Employee List', employees:allEmployees});
        }
    });
}

// Add New Employee

// GET
EmployeeModule.employeeCreateGET = function(req,res,next) {
    //Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        accounts: function(callback) {
            Account.find(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('new-employee', { title: 'Add New Employee', accounts:results.accounts});        
    });    
}

//POST
EmployeeModule.employeeCreatePOST = function(req, res, next) {   
    
    //Check the field is not empty
    req.checkBody('name', 'Employee name required').notEmpty(); 
    // req.checkBody('reportingManager', 'Reporting Manager required').notEmpty();
    req.checkBody('empId', 'Employee ID required').notEmpty();

    //Trim and escape the name field. 
    req.sanitize('name').escape();
    req.sanitize('name').trim();
    req.sanitize('empId').escape();
    req.sanitize('empId').trim();

    var errors = req.validationErrors();

    if(errors) {
        async.parallel({
            accounts: function(callback) {
                Account.find(callback);
            }
        }, function(err, results) {
            if (err) { return next(err); }
            res.render('new-employee', { title: 'Add New Employee', accounts:results.accounts, errors:errors});        
        }); 
    } else {
        var employee = new Employee(req.body);   
        employee.save(function (err) {
            if (err) { return next(err); }
            else {
                res.redirect('/api/employees');
            }        
        });   
    }         
};

//Display Employee Details
EmployeeModule.employeeDetailsGET = function(req,res,next) {
    Employee.findById(req.params.id)
    .populate('accountName')
    .exec(function(err, empDetails) {
        if(err) {
            res.send(err);
        }else {
            console.log(empDetails);
            res.render('employee-details', {title:'Employee Details', employeeDetails:empDetails});
        }
    });  
}

module.exports = EmployeeModule;