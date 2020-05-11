const requireResource = require('../common/commons').requireResource;

/**
 * Load the user. Also creates it if it is not exists.
 */

module.exports.verifyFn = objectRepo => {
    return (accessToken, refreshToken, profile, cb) => {
        objectRepo.userRepo
            .findOne({oauthInternalId: profile.internal_id})
            .exec((err, user) => {
                if (!requireResource(err, user, 'user', profile.internal_id)) {
                    if (profile !== null && profile !== {}) {
                        let newUser = new objectRepo.userRepo();
                        newUser.name = `${profile.sn} ${profile.givenName}`;
                        newUser.oauthInternalId = profile.internal_id;
                        newUser.email = profile.mail;
                        newUser.admin = false;
                        newUser.save();

                        console.log("Login completed for new user: " + profile.internal_id);
                        return cb(null, newUser);
                    }
                    return cb(null, false, 'Authentication error: profile was not found');
                }

                console.log("Login completed for user: " + profile.internal_id);
                return cb(null, user);
            });
    };
};

/**
 * Retrieves the user profile using access token.
 */

module.exports.userProfileFn = passport => (accesstoken, done) => {
    passport._oauth2._request("GET", "https://auth.sch.bme.hu/api/profile/", null, null, accesstoken, (err, data) => {
        if (err)
            return done(err);

        try {
            data = JSON.parse(data);
        } catch (e) {
            return done(e);
        }
        done(null, data);
    });
};
