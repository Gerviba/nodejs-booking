/**
 * Provides search results if the `q` GET query param exists
 * or return all the places if it is black or not provided
 *
 * The result will be saved to res.locals.searchResult
 * and the search query will be saved to res.locals.searchQuery
 */

const placesRepo = require("../../model/place-entity");

module.exports = (objects, grant) => (req, res, next) => {
    res.locals.searchQuery = queryParamOrDefault(req, 'q', '');

    // TODO: Use search from DB
    if (res.locals.searchQuery !== '') {
        res.locals.searchResult = [];
    } else {
        res.locals.searchResult = placesRepo.demoPlaces;
    }
    next();
};

function queryParamOrDefault(req, queryParam, defaultValue) {
    return typeof req.query[queryParam] === 'undefined' ? defaultValue : req.query[queryParam];
}
