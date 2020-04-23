const Schema = require('mongoose').Schema;
const db = require('../config/database');

const ReviewEntity = db.model('Review', {
    _place: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
    owner: String,
    text: String,
    rating: Number,
    costs: Number,
    date: String
});


module.exports.reviewMock = {
    id: 1,
    placeId: 1,
    placeName: "Pinyo pub",  // TODO: Calculate this dynamically
    owner: 'Kiss Pista',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada pulvinar est, in laoreet elit consectetur sit amet. Fusce malesuada at est et consequat. Curabitur auctor ullamcorper eros a ornare. Maecenas luctus, ante ac porta tristique, neque erat dapibus velit, vitae lobortis lorem velit sit amet metus. Duis pretium leo eleifend purus scelerisque, vitae faucibus erat ornare. In risus nisl, varius eu ultrices ac, eleifend sit amet felis. Vestibulum in finibus leo. Mauris euismod cursus ullamcorper. In eleifend dictum diam eget venenatis.',
    rating: 4,
    costs: 20.5,
    date: '2020-04-10 00:00'
};