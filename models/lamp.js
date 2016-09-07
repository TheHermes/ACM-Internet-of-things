var mongoose = require('mongoose');

var LampSchema = mongoose.Schema({
	id: {
		type: Number
	},
	last_on: {
		type: Date
	},
	hours_on: {
		type: Number
	},
	events: [{
		username: {
			type: String
		},
		time: {
			type: Date
		}
	}],
	status: {
		type: Boolean
	}
});


var Lamp = mongoose.model('lamp', LampSchema);

module.exports = Lamp;