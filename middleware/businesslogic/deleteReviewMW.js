const paramNotFound = require('../common/commons').paramNotFound;
const requireResource = require('../common/commons').requireResource;

/**
 * Deletes the selected place if it exists
 * - uses :id to identify the review
 */

module.exports = repos => {
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        if (paramNotFound(req, 'id')) {
            res.redirect('/admin/#places');
            return;
        }

        ReviewModel
            .findOne({ _id: req.params.id })
            .populate('_place')
            .exec((err, review) => {
                if (!requireResource(err, review, 'review', req.params.id))
                    return res.status(500).send('Failed to fetch review', err);
                const place = review._place;

                ReviewModel
                    .deleteOne({ _id: req.params.id })
                    .then(_ => {
                        ReviewModel
                            .find({ _place: place._id })
                            .exec((err, reviews) => {
                                if (!requireResource(err, reviews, 'review', place._id))
                                    return res.status(500).send('Failed to fetch reviews', err);

                                if (reviews.length === 0) {
                                    place.rating = 0;
                                } else {
                                    let allRatings = 0;
                                    reviews.forEach(it => allRatings += it.rating);
                                    place.rating = allRatings / reviews.length;
                                }

                                place.save(err => {
                                    if (err)
                                        return req.status(500).send('Failed to save place', err);
                                    next();
                                });
                            });
                    });

            });
    }
};
