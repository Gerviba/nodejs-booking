const requireLoggedIn = require('../common/commons').requireLoggedIn;

/**
 * Checks is the user was authorized as an administrator
 * - if not redirects to: /profile
 * - calls next otherwise
 */

module.exports = repos => (req, res, next) => {
    if (!requireLoggedIn(req))
        return res.redirect('/login');

    if (req.session.admin === true) {
        next();
    } else {
        res.redirect('/profile');
    }
};
