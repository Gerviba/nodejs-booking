/**
 * Renders the selected template
 */

module.exports = (objects, template) => (req, res) => {
    res.locals.view = template;
    res.render(template, res.locals);
};
