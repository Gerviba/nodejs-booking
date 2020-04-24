const requireResource = require('../common/commons').requireResource;

/**
 * Provides the data of all the places (and its reviews)
 * - Result will be saved to: res.locals.places
 */

module.exports = repos => {
    const PlaceModel = repos.placeRepo;
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        PlaceModel
            .find()
            .populate('_author')
            .then(places => {
                res.locals.places = places;

                let reviewPromises = [];
                res.locals.places.forEach(place => reviewPromises.push(ReviewModel
                    .find({ _place: place._id })
                    .populate('_owner')
                    .then(reviews => place.reviews = reviews)
                ));

                Promise.all(reviewPromises).then(_ => next());
            })
            .catch(error => res.status(404).send('Failed to fetch places', error));
    };
};