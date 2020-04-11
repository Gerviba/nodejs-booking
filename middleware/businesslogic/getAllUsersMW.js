/**
 * Provides the data of the selected users
 * - Result will be saved to: res.locals.users
 */

const usersRepo = require("../../model/user-entity");

module.exports = objects => (req, res, next) => {
    res.locals.users = [usersRepo.adminalUserMock, usersRepo.normalUserMock];
    next();
};