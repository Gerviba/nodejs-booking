const requireResource = require('../common/commons').requireResource;

/**
 * Log in as user for manual testing purposes
 */

module.exports = repos => {
    const UserModel = repos.userRepo;
    const userName = 'Kiss Pista';

    return (req, res, _) => {
        UserModel
            .findOne({ name: userName })
            .exec((err, user) => {
                if (!requireResource(err, user, 'user', userName))
                    return res.redirect('/?status=failed');

                req.session.userId = user._id;
                req.session.admin = user.admin;
                res.redirect('/?status=ok&user=normal');
            });
    };
};
