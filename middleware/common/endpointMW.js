/**
 * Renders the selected template
 */

module.exports = (repos, template) => (req, res) => {
    res.locals.view = template;
    res.render(template, res.locals);
};
