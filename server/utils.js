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

/* GET home page. */
module.exports.isLoggedIn = function (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/room/users/login');
};

module.exports.authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/room/users/login'
});
