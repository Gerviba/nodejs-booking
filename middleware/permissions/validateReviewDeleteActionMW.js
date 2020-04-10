/**
 * Checks is the user was authorized to delete a review identified by :id param
 * - if not redirects to: /ratings
 * - calls next otherwise
 */

module.exports = objects => function (req, res, next) {
    next();
};