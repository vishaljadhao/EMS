var env = process.env.NODE_ENV || "development",
	config = require('./config/config.json')[env];

// module.exports = {
// 	'url': 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db
// }

module.exports = {
	'url': 'mongodb://Vishal75j:Vishal75Mlab@ds059207.mlab.com:59207/ems_database'
}
