/**
 * Redirects the user to the specified target
 */

module.exports = (objects, target) => (req, res) => {
    console.log(`redirecting to ${target}`);
    res.redirect(target);
};