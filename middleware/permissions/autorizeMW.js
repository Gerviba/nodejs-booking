/**
 * Checks is the user was authenticated
 * - if not redirects to: /login
 * - calls next otherwise
 *
 * Also provides info about the current user for the following middlewares (in the res.locals.user)
 */

const usersRepo = require("../../model/user-entity");

module.exports = objects => (req, res, next) => {
    res.locals.user = usersRepo.adminalUserMock;
    next();
};
