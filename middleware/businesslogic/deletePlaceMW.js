const paramNotFound = require('../common/commons').paramNotFound;

/**
 * Deletes the selected place if it exists
 * - uses :id to identify the place
 */

module.exports = repos => {
    const PlaceModel = repos.placeRepo;
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        if (paramNotFound(req, 'id')) {
            res.redirect('/admin/#places');
            return;
        }

        ReviewModel
            .deleteMany({ _place: req.params.id })
            .exec((err, _) => {
                PlaceModel
                    .deleteOne({ _id: req.params.id })
                    .exec((err, _) => next())
            });
    }
};
