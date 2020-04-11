/**
 * Provides the data of all the reviews owned by the current user
 * - Result will be saved to: res.locals.reviews
 */

const reviewRepo = require("../../model/review-entity");

module.exports = objects => (req, res, next) => {
    res.locals.reviews = [reviewRepo.reviewMock, reviewRepo.reviewMock];
    next();
};