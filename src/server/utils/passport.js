const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;

const User = require('../models/user');
const {NotFoundError, AuthenticationError} = require('@server/errors');
const {SERVER} = require('@root/config/server');

/**
 * Login strategy
 */
passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, next) => {
            try {
                const user = await User.findOne({email: email.toLowerCase()});
                if (!user) {
                    return next(new NotFoundError('Email not found.'));
                }
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return next(new AuthenticationError());
                }
                next(null, user);
            } catch (e) {
                next(e);
            }
        },
    ),
);

/**
 * Authentication check strategy
 */
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromHeader('authorization'),
            secretOrKey: SERVER.JWT_SECRET,
            ignoreExpiration: true,
        },
        async (jwt, next) => {
            try {
                const user = await User.findById(jwt.id);
                if (user) {
                    delete user.password;
                    next(null, user);
                    return;
                }
                next(null, null);
            } catch (err) {
                next(err);
            }
        },
    ),
);

/**
 * Login JWT Required middleware.
 */
exports.isAuthenticated = passport.authenticate('jwt', {session: false}, null);
