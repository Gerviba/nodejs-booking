/**
 * Provides the data of the current user
 * - Result will be saved to: res.locals.user
 */

const crypto = require('crypto');

module.exports = objects => (req, res, next) => {
    res.locals.user.emailHash = crypto.createHash('md5').update(res.locals.user.email).digest("hex");
    next();
};