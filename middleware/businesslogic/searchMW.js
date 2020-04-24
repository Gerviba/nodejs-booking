const requireResource = require('../common/commons').requireResource;

/**
 * Provides search results if the `q` GET query param exists
 * or return all the places if it is black or not provided
 *
 * The result will be saved to res.locals.searchResult
 * and the search query will be saved to res.locals.searchQuery
 */

module.exports = repos => {
    const PlaceModel = repos.placeRepo;

    return (req, res, next) => {
        res.locals.searchQuery = queryParamOrDefault(req, 'q', '');

        const query = (res.locals.searchQuery !== '')
            ? PlaceModel.find({ name: new RegExp('.*' + res.locals.searchQuery + '.*', 'i') })
            : PlaceModel.find();

        query.exec((err, places) => {
            if (!requireResource(err, places, 'place', res.locals.searchQuery))
                return res.status(500).send('Failed to fetch places', err);

            res.locals.searchResult = places;
            next();
        });
    };
};

function queryParamOrDefault(req, queryParam, defaultValue) {
    return typeof req.query[queryParam] === 'undefined' ? defaultValue : req.query[queryParam];
}
