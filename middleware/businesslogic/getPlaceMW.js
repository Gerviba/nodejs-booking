/**
 * Provides the data of the selected place
 * - uses the :id param as place id
 * - Result will be saved to: res.locals.place
 */

const placesRepo = require("../../model/place-entity");
const reviewRepo = require("../../model/review-entity");

module.exports = objects => (req, res, next) => {
    if (typeof req.params.id === 'undefined' || req.params.id === null) {
        res.redirect("/");
        return;
    }

    res.locals.place = placesRepo.demoPlaces[req.params.id - 1];
    res.locals.reviews = [reviewRepo.reviewMock];
    next();
};