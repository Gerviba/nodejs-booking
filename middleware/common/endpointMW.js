/**
 * Renders the selected template
 */

module.exports = (objects, template) => (req, res) => {
    console.log(`endpoint to render: ${template}`);
    res.end(`Template: ${template}`);
};
