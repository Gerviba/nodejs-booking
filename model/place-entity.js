/**
 *
 * @type {{website: string, latitude: number, authorId: number, photo2: string, type: string, labels: [string...], photo1: string, lastVisited: string, name: string, priceCategory: number, location: string, id: number, longitude: number}}
 */
var placeMock = {
    id: 1,
    authorId: 2,
    name: 'Name of the place 1',
    location: 'Location of the place\n',
    longitude: 0.0,
    latitude: 0.0,
    website: 'http://website.com/xyz/building',
    photo1: 'https://i.picsum.photos/id/1031/5446/3063.jpg',
    photo2: 'https://i.picsum.photos/id/1029/4887/2759.jpg',
    type: 'accommodation',
    priceCategory: 5,
    lastVisited: '2020-00-00',
    labels: ["wifi", "bathroom", "vip"],
    rating: 3,
    description: 'Lorem ipsum dolor sit amet'
};

module.exports.demoPlaces = [
    {
        id: 1,
        name: 'Accommodation 1',
        location: 'Location',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        photo1: 'https://i.picsum.photos/id/1065/2000/1000.jpg',
        type: 'accommodation',
        rating: 4,
        labels: ["wifi", "bathroom"],

        longitude: 17.0,
        latitude: 42.0,
        lastVisited: '2020-00-00',
        photo2: 'https://i.picsum.photos/id/179/2000/1000.jpg',
        website: 'http://website.com/xyz/building1',
        priceCategory: 2,
        ownerId: 2,
        ownerName: "Kiss Pista" // TODO: Calculate dynamically from db
    },
    {
        id: 2,
        name: 'Accommodation 2',
        location: 'Another location',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        photo1: 'https://i.picsum.photos/id/178/2000/1000.jpg',
        type: 'accommodation',
        rating: 1,
        labels: ["wifi", "vip"],

        longitude: 17.0,
        latitude: 42.0,
        lastVisited: '2020-02-01',
        photo2: 'https://i.picsum.photos/id/221/2000/1000.jpg',
        website: 'http://website.com/xyz/building2',
        priceCategory: 5,
        ownerId: 1,
        ownerName: "Admi User" // TODO: Calculate dynamically from db
    },
    {
        id: 3,
        name: 'Pub 42',
        location: 'Budapest, ::1',
        description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        photo1: 'https://i.picsum.photos/id/163/400/200.jpg',
        type: 'pub',
        rating: 3,
        labels: ["parking"],

        longitude: 17.0,
        latitude: 42.0,
        lastVisited: '2020-04-00',
        photo2: 'https://i.picsum.photos/id/195/2000/1000.jpg',
        website: 'http://website.com/xyz/pub',
        priceCategory: 1,
        ownerId: 1,
        ownerName: "Admi User" // TODO: Calculate dynamically from db
    }
];
