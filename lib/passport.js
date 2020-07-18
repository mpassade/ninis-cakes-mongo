const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../routes/models/userModel');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    'local-login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                return done(err, null);
            }
            if (!user) {
                return done(null, false, req.flash('errors', 'A user with that email does not exist'));
            }
            if(user.tempPassword===true){
                return done(null, false, req.flash('errors', 'Please follow the link in the email and set a new password'));
            }
            bcrypt.compare(password, user.password)
            .then((result) => {
                if (!result) {
                    return done(
                        null,
                        false,
                        req.flash('errors', 'Check email and password')
                    );
                } else {
                    return done(null, user);
                }
            }).catch((error) => {
                return done(error, null);
            });
        });
    })
);