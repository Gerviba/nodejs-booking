const paramNotFound = require('../common/commons').paramNotFound;

/**
 * Checks is the user was authorized to delete a review identified by :id param
 * - if not redirects to: /ratings
 * - calls next otherwise
 */

module.exports = repos => {
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        if (paramNotFound(req, 'id')) {
            res.redirect('/ratings');
            return;
        }

        ReviewModel
            .findOne({ _id: req.params.id })
            .exec((err, review) => {
                if (review._owner.toString() === req.session.userId) {
                    next();
                } else {
                    res.redirect('/ratings');
                }
            });

    }
};