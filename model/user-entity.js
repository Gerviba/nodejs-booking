
/**
 * Admin felhasználó mock
 * @type {{name: string, admin: boolean, id: number, email: string, oauthInternalId: string}}
 */
var adminalUserMock = {
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
var normalUserMock = {
    id: 2,
    oauthInternalId: '1f63f9e2-fc7b-475f-a9e0-ffdf28e245b1',
    name: 'Kiss Pista',
    email: 'kispista@edu.bme.hu',
    admin: false
};
