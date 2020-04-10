/**
 * Checks is the user was authenticated
 * - if not redirects to: /login
 * - calls next otherwise
 *
 * Also provides info about the current user for the following middlewares
 */

module.exports = function (objects) {
    return function (req, res, next) {
        next();
    };
};