/**
 * Logs out the logged in user
 */

module.exports = repos => (req, res, next) => req.session.destroy(_ => next());
