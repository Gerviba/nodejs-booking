/**
 * Redirects the user to the specified target
 */

module.exports = (repos, target) => (req, res) => res.redirect(target);

