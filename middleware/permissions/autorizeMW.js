const requireResource = require('../common/commons').requireResource;
const requireLoggedIn = require('../common/commons').requireLoggedIn;

/**
 * Checks is the user was authenticated
 * - if not redirects to: /login
 * - calls next otherwise
 *
 * Also provides info about the current user for the following middlewares (in the res.locals.user)
 */

module.exports = repos => {
    const UserModel = repos.userRepo;

    return (req, res, next) => {
        if (!requireLoggedIn(req))
            return res.redirect('/login');

        UserModel
            .findOne({ _id: req.session.userId })
            .exec((err, user) => {
                if (!requireResource(err, user, 'user', req.session.userId))
                    return res.redirect('/403');

                res.locals.user = user;
                next();
            });
    };
};
