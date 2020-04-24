const authorizationMW = require('../middleware/permissions/autorizeMW');
const checkAdminMW = require('../middleware/permissions/adminMW');
const logoutMW = require('../middleware/permissions/logoutMW');
const redirectToSingleSignOnMW = require('../middleware/permissions/ssoRedirectMW');
const endpointMW = require('../middleware/common/endpointMW');
const redirectMW = require('../middleware/common/redirectMW');

const populateSearch = require('../middleware/businesslogic/searchMW');
const getPlaceMW = require('../middleware/businesslogic/getPlaceMW');
const newPlaceMW = require('../middleware/businesslogic/newPlaceMW');
const editPlaceMW = require('../middleware/businesslogic/editPlaceMW');
const deletePlaceMW = require('../middleware/businesslogic/deletePlaceMW');

const getMyReviewsMW = require('../middleware/businesslogic/getMyReviewsMW');
const newReviewMW = require('../middleware/businesslogic/newReviewMW');
const deleteReviewMW = require('../middleware/businesslogic/deleteReviewMW');
const getUserMW = require('../middleware/businesslogic/getUserMW');
const validateReviewDeleteActionMW = require('../middleware/permissions/validateReviewDeleteActionMW');
const validatePlaceMW = require('../middleware/businesslogic/validatePlaceMW');

const getAllPlacesMW = require('../middleware/businesslogic/getAllPlacesMW');
const getAllUsersMW = require('../middleware/businesslogic/getAllUsersMW');
const grantAdminMW = require('../middleware/permissions/grantUserMW');

const testLoginAsAdmin = require('../middleware/test/loginAsAdminMW');
const testLoginAsUser = require('../middleware/test/loginAsUserMW');
const testLoadData = require('../middleware/test/loadTestData');

const userRepo = require('../model/userEntity');
const placeRepo = require('../model/placeEntity');
const reviewRepo = require('../model/reviewEntity');

module.exports = app => {
    const objectRepo = {
        userRepo: userRepo,
        placeRepo: placeRepo,
        reviewRepo: reviewRepo
    };

    app.get('/ratings',
        authorizationMW(objectRepo),
        getMyReviewsMW(objectRepo),
        endpointMW(objectRepo, 'ratings'));

    app.get('/login', redirectToSingleSignOnMW(objectRepo));

    app.get('/logout',
        logoutMW(objectRepo),
        redirectMW(objectRepo, '/'));

    app.post('/ratings/:id/delete',
        authorizationMW(objectRepo),
        validateReviewDeleteActionMW(objectRepo),
        deleteReviewMW(objectRepo),
        redirectMW(objectRepo, '/ratings?status=ok'));

    app.get('/profile',
        authorizationMW(objectRepo),
        getUserMW(objectRepo),
        endpointMW(objectRepo, 'profile'));

    app.get('/place/:id',
        getPlaceMW(objectRepo),
        endpointMW(objectRepo, 'details'));

    app.get('/new-place',
        authorizationMW(objectRepo),
        endpointMW(objectRepo, 'insert-place'));

    app.post('/new-place',
        authorizationMW(objectRepo),
        validatePlaceMW(objectRepo),
        newPlaceMW(objectRepo));

    app.get('/place/:id/new-review',
        authorizationMW(objectRepo),
        getPlaceMW(objectRepo),
        endpointMW(objectRepo, 'insert-review'));

    app.post('/place/:id/new-review',
        authorizationMW(objectRepo),
        getPlaceMW(objectRepo),
        newReviewMW(objectRepo));

    app.get('/admin',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        getAllPlacesMW(objectRepo),
        getAllUsersMW(objectRepo),
        endpointMW(objectRepo, 'admin'));

    app.post('/admin/place/:id/delete',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        deletePlaceMW(objectRepo),
        redirectMW(objectRepo, '/admin'));

    app.get('/admin/place/:id',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        getPlaceMW(objectRepo),
        endpointMW(objectRepo, 'edit-place'));

    app.post('/admin/place/:id',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        validatePlaceMW(objectRepo),
        editPlaceMW(objectRepo),
        redirectMW(objectRepo, '/admin'));

    app.post('/admin/review/:id/delete',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        deleteReviewMW(objectRepo),
        redirectMW(objectRepo, '/admin'));

    app.post('/admin/user/:id/grant',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        grantAdminMW(objectRepo, true),
        redirectMW(objectRepo, '/admin#users'));

    app.post('/admin/user/:id/revoke',
        authorizationMW(objectRepo),
        checkAdminMW(objectRepo),
        grantAdminMW(objectRepo, false),
        redirectMW(objectRepo, '/admin#users'));

    // Endpoints form manual testing purposes:
    app.get('/test/login/admin', testLoginAsAdmin(objectRepo));
    app.get('/test/login/user', testLoginAsUser(objectRepo));
    app.get('/test/data', testLoadData(objectRepo));

    app.get('',
        populateSearch(objectRepo),
        endpointMW(objectRepo, 'index'));

};