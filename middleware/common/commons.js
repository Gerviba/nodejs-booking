/**
 * Checks whether the resource is provided. Returns true if failed.
 * @returns {boolean}
 */
module.exports.requireResource = (err, resource, entity, id) => {
    if ((err) || (!resource)) {
        console.error(`Resource '${entity}' was not found by '${id}'`);
        return false;
    }
    return true;
};

/**
 * Requires param to exists. Return true if not found.
 * @returns {boolean}
 */
module.exports.paramNotFound = (req, param) => {
    return (typeof req.params[param] === 'undefined') || (req.params[param] === null);
};

/**
 * Checks if the user was logged in.
 * @returns {boolean}
 */
module.exports.requireLoggedIn = req => {
    return !(typeof req.session.userId === 'undefined') || (req.session.userId === null);
};