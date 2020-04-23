const Schema = require('mongoose').Schema;
const db = require('../config/database');

const UserEntity = db.model('User', {
    oauthInternalId: String,
    name: String,
    email: String,
    admin: Boolean
});


/**
 * Admin felhasználó mock
 * @type {{name: string, admin: boolean, id: number, email: string, oauthInternalId: string}}
 */
module.exports.adminalUserMock = {
    id: 1,
    oauthInternalId: '99f656b9-79c7-4257-8207-b400d082abe4',
    name: 'Admin User',
    email: 'admin@edu.bme.hu',
    admin: true
};

/**
 * Normál felhasználó mock
 * @type {{name: string, admin: boolean, id: number, email: string, oauthInternalId: string}}
 */
module.exports.normalUserMock = {
    id: 2,
    oauthInternalId: '1f63f9e2-fc7b-475f-a9e0-ffdf28e245b1',
    name: 'Kiss Pista',
    email: 'kispista@edu.bme.hu',
    admin: false
};
