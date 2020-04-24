/**
 * Redirects the user to a single sign on provider (authsch will be used here)
 * TODO: Use oAuth2 lib in the future, passport looks good.
 * NOTE: I'll implement until the 6th hw deadline.
 */

module.exports = (objects, target) => (req, res) => {
    console.log('SSO redirection...');
    res.redirect('http://auth.sch.bme.hu/login?code=still_not_implemented');
};
