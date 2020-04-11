/**
 * Creates a new review or renders the new review again if validation error occurs
 * Redirects to the connected place if successful
 */

module.exports = objects => function (req, res) {
    res.redirect(`/place/${res.local.place.id}`);
};