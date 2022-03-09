const express = require('express');
const router = express.Router();

const passport = require('passport');
const {body} = require('express-validator');

const {isAuthenticated} = require('@server/utils/passport');
const {NotFoundError} = require('@server/errors');
const validator = require('@server/api/middleware/validator');

router.post(
    '/login',
    [
        body().customSanitizer(body => ({
            ...body,
            email: body.email?.toLowerCase().trim(),
        })),
        body('email')
            .isEmail()
            .withMessage('Empty email'),
        body('password')
            .not()
            .isEmpty()
            .withMessage('Empty password'),
        // body('remember').toBoolean(),
    ],
    validator,
    passport.authenticate('login', {session: false}, null),
    (req, res) => {
        const user = req.user;
        res.status(200).json({
            // token: user.generateJWT(req.body.remember),
            user: user.toJSON()
        });
    },
);

router.post('/logout', isAuthenticated, validator, (req, res) => {
    res.status(200).end();
});

router.get('/current', isAuthenticated, validator, async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new NotFoundError('User not found.'));
        }
        res.status(200).json({data: {user: user.toJSON()}});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
