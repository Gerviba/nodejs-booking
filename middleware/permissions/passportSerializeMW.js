const requireResource = require('../common/commons').requireResource;

/**
 * Loads the user into the session
 */

module.exports = repos => (req, user, cb) => {
        req.session.userId = user._id;
        req.session.admin = user.admin;
        return cb(null, user);
};