const requireResource = require('../common/commons').requireResource;
const endpointMW = require('../common/endpointMW');

/**
 * Creates a new review or renders the new review again if validation error occurs
 * Redirects to the connected place if successful
 */

module.exports = repos => {
    const PlaceModel = repos.placeRepo;
    const ReviewModel = repos.reviewRepo;

    return (req, res) => {
        if (typeof req.body.text === 'undefined' ||
            typeof req.body.rating === 'undefined' ||
            typeof req.body.costs === 'undefined'
        ) {
            return res.status(400).send('Bad request');
        }

        let errors = [];
        if (req.body.text.length < 16)
            errors.push('The review cannot be empty! Use at least 16 characters.');
        if (!Number.isFinite(parseFloat(req.body.costs)))
            errors.push('Price per day must be a number!');
        if (parseFloat(req.body.costs) < 0)
            errors.push('Price per day must be a positive number!');
        if (!Number.isInteger(parseInt(req.body.rating)) || req.body.rating < 1 || req.body.rating > 5)
            errors.push('Use 1 to 5 stars...');

        if (errors.length > 0) {
            res.locals.errors = errors;
            res.locals.review = req.body;
            endpointMW(repos, 'insert-review')(req, res);
            return;
        }

        let review = new ReviewModel();
        review._owner = res.locals.user._id;
        review._place = req.params.id;
        review.text = req.body.text;
        review.rating = parseInt(req.body.rating);
        review.costs = parseFloat(req.body.costs);

        review.save(err => {
            if (err)
                return req.status(500).send('Failed to create review', err);

            PlaceModel
                .findOne({ _id: req.params.id })
                .exec((err, place) => {
                    if (!requireResource(err, place, 'place', req.params.id))
                        return res.status(500).send('Failed to fetch place', err);

                    ReviewModel
                        .find({ _place: req.params.id })
                        .exec((err, reviews) => {
                            if (!requireResource(err, reviews, 'review', req.params.id))
                                return res.status(500).send('Failed to fetch reviews', err);

                            let allRatings = 0;
                            reviews.forEach(it => allRatings += it.rating);
                            place.rating = allRatings / reviews.length;

                            place.save(err => {
                                if (err)
                                    return req.status(500).send('Failed to save place', err);
                                res.redirect(`/place/${req.params.id}`);
                            });
                        });

                });
        });

    }
};