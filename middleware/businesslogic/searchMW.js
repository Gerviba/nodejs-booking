/**
 * Provides search results if the `q` GET query param exists
 * or return all the places if it is black or not provided
 *
 * The result will be saved to res.local.searchResult
 */

module.exports = (objects, grant) => (req, res, next) => {
    next();
};