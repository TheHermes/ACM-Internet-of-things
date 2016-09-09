var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy(function(username, password, done) {

    User.getUserByUsername(username, function(err, user) {
        if (err) throw err;
        if (!user) {
            if(username == 'admin'){
                //User.save();
                var newUser = User.createUser(User({
                    username: username,
                    password: password
                }));
                return done(null, true, {
                    message: 'Admin created'
                });
            }
            return done(null, false, {
                message: 'No User Found'
            });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid Password'
                });
            }
        })
    });
}));


module.exports = passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/login'
});