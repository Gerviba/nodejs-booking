const requireResource = require('../common/commons').requireResource;
const paramNotFound = require('../common/commons').paramNotFound;

/**
 * Provides the data of the selected place
 * - uses the :id param as place id
 * - Result will be saved to: res.locals.place
 */
module.exports = repos => {
    const PlaceModel = repos.placeRepo;
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        if (paramNotFound(req, 'id')) {
            res.redirect('/');
            return;
        }

        PlaceModel
            .findOne({ _id: req.params.id })
            .populate('_author')
            .exec((err, place) => {
                if (!requireResource(err, place, 'place', req.params.id))
                    return res.status(404).send('Place not found');

                ReviewModel
                    .find({ _place: place._id })
                    .populate('_owner')
                    .exec((err, reviews) => {
                        if (!requireResource(err, reviews, 'reviews', place._id))
                            return res.status(500).send('Failed to fetch reviews', err);

                        res.locals.place = place;
                        res.locals.reviews = reviews;
                        next();
                    });

            });

    };
};