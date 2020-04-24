const requireLoggedIn = require('../common/commons').requireLoggedIn;

/**
 * Provides the data of the current user
 * - Result will be saved to: res.locals.user
 */

const crypto = require('crypto');

module.exports = repos => {
    const UserModel = repos.userRepo;

    return (req, res, next) => {
        if (!requireLoggedIn(req))
            return res.redirect('/login');

        res.locals.user.emailHash = crypto.createHash('md5').update(res.locals.user.email).digest('hex');
        next();
    }
};

