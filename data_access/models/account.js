var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AccountSchema = Schema({
    accountName: {type: String, required: true, max:100},
    accountHead: {type: String, required: true, max:100}
});

// Virtual for this Employee instance URL
AccountSchema
.virtual('url')
.get(function () {
  return '/api/account/'+this.id;
});

module.exports = mongoose.model('Account', AccountSchema);
