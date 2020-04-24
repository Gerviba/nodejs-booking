const requireResource = require('../common/commons').requireResource;
const paramNotFound = require('../common/commons').paramNotFound;

/**
 * Edit the model of the place or renders the edit page again if validation error occurs
 * - uses :id to identify place
 */

module.exports = repos => {
    const PlaceModel = repos.placeRepo;

    return (req, res, next) => {
        if (paramNotFound(req, 'id')) {
            res.redirect('/admin/#places');
            return;
        }

        PlaceModel
            .findOne({ _id: req.params.id })
            .exec((err, place) => {
                if (!requireResource(err, place, 'place', req.params.id))
                    return res.status(404).send('Failed to fetch place', err);

                place.name = req.body.name;
                place.location = req.body.location;
                place.longitude = req.body.longitude;
                place.latitude = req.body.latitude;
                place.website = req.body.website;
                place.photo1 = req.body.photo1;
                place.photo2 = req.body.photo2;
                place.type = req.body.type;
                place.priceCategory = req.body.priceCategory;
                place.lastVisited = req.body.lastVisited;
                place.labels = req.body.labels.split(/, */i);
                place.description = req.body.description;
                place.save(err => {
                    if (err)
                        return req.status(500).send('Failed to modify place');
                    next();
                });
            });

    }
};