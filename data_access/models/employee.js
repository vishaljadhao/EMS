var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var EmployeeSchema = Schema({
    name: {type: String, required: true, max:100},
    designation: {type: String, required: true, max:100},
    empId: {type:Number},
    reportingManager: {type: String, required: true, max:100},
    accountName: { type: Schema.ObjectId, ref: 'Account', required: true },
});

// Virtual for this Employee instance URL
EmployeeSchema
.virtual('url')
.get(function () {
  return '/api/employee/'+this.id;
});

module.exports = mongoose.model('Employee', EmployeeSchema);
