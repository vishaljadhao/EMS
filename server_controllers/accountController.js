var Account = require('../data_access/models/account');

AccountModule = {};

//Display All Accounts
AccountModule.displayAccounts = function(req,res,next) {
    Account.find()
    .sort('accountName')
    .exec(function(err, allAccounts) {
        if(err) {
            res.send(err);
        }else {
            res.render('accounts', {title:'Account List', accounts:allAccounts});
        }
    });
}

// Add New Account

// GET
AccountModule.accountCreateGET = function(req,res,next) {
    res.render('new-account', { title: 'Add New Account'});
}

//POST
AccountModule.accountCreatePOST = function(req, res, next) {       

    //Check the field is not empty
    req.checkBody('accountName', 'Account name required').notEmpty(); 
    req.checkBody('accountHead', 'Account head required').notEmpty();

    //Trim and escape the name field. 
    req.sanitize('accountName').escape();
    req.sanitize('accountName').trim();
    req.sanitize('accountHead').escape();
    req.sanitize('accountHead').trim();

    var errors = req.validationErrors();

    if(errors) {
        res.render('new-account', { title: 'Add New Account', errors: errors});
    }else {
        var account = new Account(req.body);   
        account.save(function (err) {
            if (err) { return next(err); }
            else {
                res.redirect('/api/accounts');
            }        
        });    
    }        
};

module.exports = AccountModule;