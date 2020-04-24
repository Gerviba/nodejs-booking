const requireResource = require('../common/commons').requireResource;
const requireLoggedIn = require('../common/commons').requireLoggedIn;

/**
 * Provides the data of all the reviews owned by the current user
 * - Result will be saved to: res.locals.reviews
 */

module.exports = repos => {
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        if (!requireLoggedIn(req))
            return res.redirect('/login');

        ReviewModel
            .find({ _owner: req.session.userId })
            .populate('_place')
            .exec((err, reviews) => {
                if (!requireResource(err, reviews, 'review', req.session.userId))
                    return res.status(500).send('Failed to fetch reviews', err);

                res.locals.reviews = reviews;
                next();
            });
    };
};
