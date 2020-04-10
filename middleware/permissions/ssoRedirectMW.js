/**
 * Redirects the user to a single sign on provider (authsch will be used here)
 * TODO: Use oAuth2 lib in the future, passport looks good
 */

module.exports = (objects, target) => (req, res) => {
    console.log("SSO redirection...");
    res.redirect("http://auth.sch.bme.hu/login?code=not_implemented");
};