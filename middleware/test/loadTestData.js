/**
 * Loads blank data to the db for manual testing purposes
 */

module.exports = repos => {
    const UserModel = repos.userRepo;
    const PlaceModel = repos.placeRepo;
    const ReviewModel = repos.reviewRepo;

    return (req, res, next) => {
        let adminUser = new UserModel();
        adminUser.name = UserModel._adminalUserMock.name;
        adminUser.oauthInternalId = UserModel._adminalUserMock.oauthInternalId;
        adminUser.email = UserModel._adminalUserMock.email;
        adminUser.admin = UserModel._adminalUserMock.admin;
        adminUser.save();

        let simpleUser = new UserModel();
        simpleUser.name = UserModel._normalUserMock.name;
        simpleUser.oauthInternalId = UserModel._normalUserMock.oauthInternalId;
        simpleUser.email = UserModel._normalUserMock.email;
        simpleUser.admin = UserModel._normalUserMock.admin;
        simpleUser.save();

        let place1 = new PlaceModel();
        place1.name = PlaceModel._demoPlaces[0].name;
        place1.location = PlaceModel._demoPlaces[0].location;
        place1._author = adminUser._id;
        place1.longitude = PlaceModel._demoPlaces[0].longitude;
        place1.latitude = PlaceModel._demoPlaces[0].latitude;
        place1.website = PlaceModel._demoPlaces[0].website;
        place1.photo1 = PlaceModel._demoPlaces[0].photo1;
        place1.photo2 = PlaceModel._demoPlaces[0].photo2;
        place1.type = PlaceModel._demoPlaces[0].type;
        place1.labels = PlaceModel._demoPlaces[0].labels;
        place1.lastVisited = PlaceModel._demoPlaces[0].lastVisited;
        place1.priceCategory = PlaceModel._demoPlaces[0].priceCategory;
        place1.description = PlaceModel._demoPlaces[0].description;
        place1.rating = PlaceModel._demoPlaces[0].rating;
        place1.save();

        let place2 = new PlaceModel();
        place2.name = PlaceModel._demoPlaces[1].name;
        place2.location = PlaceModel._demoPlaces[1].location;
        place2._author = adminUser._id;
        place2.longitude = PlaceModel._demoPlaces[1].longitude;
        place2.latitude = PlaceModel._demoPlaces[1].latitude;
        place2.website = PlaceModel._demoPlaces[1].website;
        place2.photo1 = PlaceModel._demoPlaces[1].photo1;
        place2.photo2 = PlaceModel._demoPlaces[1].photo2;
        place2.type = PlaceModel._demoPlaces[1].type;
        place2.labels = PlaceModel._demoPlaces[1].labels;
        place2.lastVisited = PlaceModel._demoPlaces[1].lastVisited;
        place2.priceCategory = PlaceModel._demoPlaces[1].priceCategory;
        place2.description = PlaceModel._demoPlaces[1].description;
        place2.rating = PlaceModel._demoPlaces[1].rating;
        place2.save();

        let place3 = new PlaceModel();
        place3.name = PlaceModel._demoPlaces[2].name;
        place3.location = PlaceModel._demoPlaces[2].location;
        place3._author = simpleUser._id;
        place3.longitude = PlaceModel._demoPlaces[2].longitude;
        place3.latitude = PlaceModel._demoPlaces[2].latitude;
        place3.website = PlaceModel._demoPlaces[2].website;
        place3.photo1 = PlaceModel._demoPlaces[2].photo1;
        place3.photo2 = PlaceModel._demoPlaces[2].photo2;
        place3.type = PlaceModel._demoPlaces[2].type;
        place3.labels = PlaceModel._demoPlaces[2].labels;
        place3.lastVisited = PlaceModel._demoPlaces[2].lastVisited;
        place3.priceCategory = PlaceModel._demoPlaces[2].priceCategory;
        place3.description = PlaceModel._demoPlaces[2].description;
        place3.rating = PlaceModel._demoPlaces[2].rating;
        place3.save();

        let review1 = new ReviewModel();
        review1.costs = ReviewModel._reviewMock.costs;
        review1.date = ReviewModel._reviewMock.date;
        review1._owner = simpleUser._id;
        review1._place = place1._id;
        review1.rating = ReviewModel._reviewMock.rating;
        review1.text = ReviewModel._reviewMock.text;
        review1.save();

        res.redirect('/?status=ok');
    }
};