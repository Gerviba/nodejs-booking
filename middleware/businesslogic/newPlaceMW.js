/**
 * Registers a new place or renders the new page again if validation error occurs
 */

module.exports = repos => {
    const PlaceModel = repos.placeRepo;

    return (req, res, _) => {
        let place = new PlaceModel();
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
        place._author = res.locals.user._id;
        place.rating = 0;
        place.save(err => {
            if (err)
                return req.status(500).send('Failed to create place');
            res.redirect(`/place/${place._id}`);
        });
    }
};