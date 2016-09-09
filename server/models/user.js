var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		bcrypt: true,
		required: true
	},
	isAdmin: {
		type: Boolean
	}
});

var User = module.exports = mongoose.model('user', UserSchema);

module.exports.getUserByUsername = function(username, callback) {
	var query = {
		username: username
	};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {

	User.findById(id, callback);
}

module.exports.comparePassword = function(candidPassword, hash, callback) {
	bcrypt.compare(candidPassword, hash, function(err, isMatch) {
		if (err) callback(err);
		callback(null, isMatch)
	})
}
var createUser = function(newUser, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
};

module.exports.createUser = createUser