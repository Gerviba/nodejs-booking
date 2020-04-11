/**
 * Redirects the user to the specified target
 */

module.exports = (objects, target) => (req, res) => {
    res.redirect(target);
};