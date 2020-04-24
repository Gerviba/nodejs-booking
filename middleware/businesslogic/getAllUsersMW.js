const requireResource = require('../common/commons').requireResource;

/**
 * Provides the data of the selected users
 * - Result will be saved to: res.locals.users
 */

module.exports = repos => {
    const UserModel = repos.userRepo;

    return (req, res, next) => {
        UserModel
            .find()
            .exec((err, users) => {
                if (!requireResource(err, users, 'user', '[ALL]'))
                    return res.status(404).send('Failed to fetch users', err);

                res.locals.users = users;
                next();
            });
    };
};
