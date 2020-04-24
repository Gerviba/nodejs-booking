const requireResource = require('../common/commons').requireResource;
const paramNotFound = require('../common/commons').paramNotFound;

/**
 * Grants or revokes admin authorities
 * - uses :id to identify the user
 * If grant true: the admin will be set to true, and false otherwise
 */

module.exports = (repos, grant) => {
    const UserModel = repos.userRepo;

    return (req, res, next) => {
        if (paramNotFound(req, 'id')) {
            res.redirect('/admin/#users');
            return;
        }

        UserModel
            .findOne({ _id: req.params.id })
            .exec((err, user) => {
                if (!requireResource(err, user, 'user', req.params.id))
                    return res.status(500).send('User not found');

                user.admin = grant;
                user.save(err => {
                    if (err)
                        return res.status(500).send('Failed to modify user');

                    console.log(`User '${user.name}' admin status: ${grant}`);
                    next();
                });
            });
    };
};
