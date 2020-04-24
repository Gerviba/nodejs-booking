const endpointMW = require('../common/endpointMW');

/**
 * Validates the place input data, calls next if it was correct and renders insert page if not
 */

module.exports = repos => (req, res, next) => {
    if (typeof req.body.name === 'undefined' ||
        typeof req.body.location === 'undefined' ||
        typeof req.body.longitude === 'undefined' ||
        typeof req.body.latitude === 'undefined' ||
        typeof req.body.website === 'undefined' ||
        typeof req.body.photo1 === 'undefined' ||
        typeof req.body.photo2 === 'undefined' ||
        typeof req.body.type === 'undefined' ||
        typeof req.body.priceCategory === 'undefined' ||
        typeof req.body.lastVisited === 'undefined' ||
        typeof req.body.labels === 'undefined' ||
        typeof req.body.description === 'undefined'
    ) {
        return res.status(400).send('Bad request');
    }

    let errors = [];
    if (req.body.name.length === 0)
        errors.push('Name cannot be empty!');
    if (req.body.location.length === 0)
        errors.push('Location cannot be empty!');
    if (!Number.isFinite(parseFloat(req.body.longitude)))
        errors.push('Longitude must be a number!');
    if (!Number.isFinite(parseFloat(req.body.latitude)))
        errors.push('Latitude must be a number!');
    if (!req.body.website.startsWith('http://') && !req.body.website.startsWith('https://'))
        errors.push('Invalid website format!');
    if (!req.body.photo1.startsWith('http://') && !req.body.photo1.startsWith('https://'))
        errors.push('Invalid first photo url!');
    if (!req.body.photo2.startsWith('http://') && !req.body.photo2.startsWith('https://'))
        errors.push('Invalid second photo url!');
    if (req.body.type !== 'pub')
        req.body.type = 'accommodation';
    if (!Number.isFinite(parseFloat(req.body.priceCategory)) || req.body.priceCategory < 1 || req.body.priceCategory > 5)
        errors.push('Price value is invalid!');
    if (req.body.labels.length === 0)
        errors.push('Please include at least one tag!');
    if (req.body.description.length < 32)
        errors.push('Please provide a brief description! (At least 32 characters)');

    if (errors.length > 0) {
        res.locals.errors = errors;
        res.locals.place = req.body;
        endpointMW(repos, 'insert-place')(req, res);
        return;
    }
    next();
};
