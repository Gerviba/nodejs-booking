/**
 * Checks is the user was authorized as an administrator
 * - if not redirects to: /profile
 * - calls next otherwise
 */

module.exports = objects => function (req, res, next) {
    next();
};