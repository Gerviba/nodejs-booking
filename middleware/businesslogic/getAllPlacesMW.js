/**
 * Provides the data of all the places (and its reviews)
 * - Result will be saved to: res.locals.places
 */

const placesRepo = require("../../model/place-entity");
const reviewsRepo = require("../../model/review-entity");

module.exports = objects => (req, res, next) => {
    res.locals.places = placesRepo.demoPlaces;
    // TODO: Load from db
    res.locals.places[0].reviews = [reviewsRepo.reviewMock];
    res.locals.places[1].reviews = [];
    res.locals.places[2].reviews = [];
    next();
};