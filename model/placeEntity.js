const Schema = require('mongoose').Schema;
const db = require('../config/database');

const PlaceEntity = db.model('Place', {
    name: String,
    location: String,
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    longitude: Number,
    latitude: Number,
    website: String,
    photo1: String,
    photo2: String,
    type: String,
    labels: [String],
    lastVisited: String,
    priceCategory: Number,
    rating: Number
});

module.exports = PlaceEntity;

/**
 * Demo places (for manual testing purposes)
 * @type {({website: string, latitude: number, rating: number, description: string, type: string, photo2: string, ownerId: number, labels: [string, string], photo1: string, lastVisited: string, ownerName: string, name: string, priceCategory: number, location: string, id: number, longitude: number}|{website: string, latitude: number, rating: number, description: string, type: string, photo2: string, ownerId: number, labels: [string, string], photo1: string, lastVisited: string, ownerName: string, name: string, priceCategory: number, location: string, id: number, longitude: number}|{website: string, latitude: number, rating: number, description: string, type: string, photo2: string, ownerId: number, labels: [string], photo1: string, lastVisited: string, ownerName: string, name: string, priceCategory: number, location: string, id: number, longitude: number})[]}
 */
module.exports._demoPlaces = [
    {
        id: 1,
        name: 'Accommodation 1',
        location: 'Location',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        photo1: 'https://i.picsum.photos/id/1065/2000/1000.jpg',
        type: 'accommodation',
        rating: 4,
        labels: ['wifi', 'bathroom'],
        longitude: 17.0,
        latitude: 42.0,
        lastVisited: '2020-00-00',
        photo2: 'https://i.picsum.photos/id/179/2000/1000.jpg',
        website: 'http://website.com/xyz/building1',
        priceCategory: 2,
        ownerId: 2,
        ownerName: 'Kiss Pista'
    },
    {
        id: 2,
        name: 'Accommodation 2',
        location: 'Another location',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        photo1: 'https://i.picsum.photos/id/178/2000/1000.jpg',
        type: 'accommodation',
        rating: 1,
        labels: ['wifi', 'vip'],
        longitude: 17.0,
        latitude: 42.0,
        lastVisited: '2020-02-01',
        photo2: 'https://i.picsum.photos/id/221/2000/1000.jpg',
        website: 'http://website.com/xyz/building2',
        priceCategory: 5,
        ownerId: 1,
        ownerName: 'Admi User'
    },
    {
        id: 3,
        name: 'Pub 42',
        location: 'Budapest, ::1',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        photo1: 'https://i.picsum.photos/id/163/400/200.jpg',
        type: 'pub',
        rating: 3,
        labels: ['parking'],
        longitude: 17.0,
        latitude: 42.0,
        lastVisited: '2020-04-00',
        photo2: 'https://i.picsum.photos/id/195/2000/1000.jpg',
        website: 'http://website.com/xyz/pub',
        priceCategory: 1,
        ownerId: 1,
        ownerName: 'Admi User'
    }
];
