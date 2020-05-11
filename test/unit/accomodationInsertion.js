const assert = require('chai').assert;
const newPlaceMW = require('../../middleware/businesslogic/validatePlaceMW');

describe('newPlaceMW middleware ', function() {

    describe('empty request', function() {
        it('no post parameters are given', function(done) {
            const req = {
                body: {}
            };

            const res = {
                locals: {},
                status: function(statusCode) {
                    this.__resultStatus = statusCode;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
                },
                __resultStatus: -1,
                __resultMessage: null,
            };

            newPlaceMW({})(req, res, function(err) {
                assert.fail('Next should not have been called!');
            });
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.equal(res.__resultStatus, 400);
            assert.isNotNull(res.__resultMessage);
            assert.equal(res.__resultMessage, 'Bad request');
            done();
        });
    });

    describe('good request', function() {
        it('all the values are good', function(done) {
            const req = {
                body: {
                    name: 'Test place',
                    location: 'Test location',
                    longitude: 12.34,
                    latitude: 56.78,
                    website: 'https://web.site',
                    photo1: 'https://photo1.png',
                    photo2: 'https://photo2.png',
                    type: 'pub',
                    priceCategory: 2,
                    lastVisited: '2020-05-01',
                    labels: 'tag, label, another tag',
                    description: 'This is a brief description, it might be long enough!'
                }
            };

            const res = {
                locals: {},
                status: function(statusCode) {
                    this.__resultStatus = statusCode;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
                },
                __resultStatus: -1,
                __resultMessage: null,
            };

            let called = false;
            newPlaceMW({})(req, res, function(err) {
                called = true;
            });
            assert.equal(called, true);
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.notEqual(res.__resultStatus, 400);
            assert.isNull(res.__resultMessage);
            done();
        });
    });

    describe('invalid request', function() {
        it('all the values are invalid', function(done) {
            const req = {
                body: {
                    name: '',
                    location: '',
                    longitude: 'twelve',
                    latitude: 'ten',
                    website: 'web',
                    photo1: '',
                    photo2: '.png',
                    type: 'nothing',
                    priceCategory: 'good',
                    lastVisited: '',
                    labels: '',
                    description: 'just not long enough'
                }
            };

            const res = {
                locals: {
                    errors: [],
                    locals: { view: null },
                    view: null,
                },
                status: function(statusCode) {
                    this.__resultStatus = statusCode;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
                },
                __renderCalled: false,
                render: function(a, b) {
                    this.__renderCalled = true;
                },
                __resultStatus: -1,
                __resultMessage: null,
            };

            let called = false;
            newPlaceMW({})(req, res, function(err) {
                called = true;
            });
            assert.equal(called, false);
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.notEqual(res.__resultStatus, 400);
            assert.isNull(res.__resultMessage);
            assert.equal(res.locals.errors.length, 10);
            assert.equal(res.locals.errors[1], 'Location cannot be empty!');
            assert.equal(res.locals.view, 'insert-place');
            assert.isNotNull(res.locals.place);
            assert.equal(res.__renderCalled, true);
            done();
        });

        it('some values are invalid', function(done) {
            const req = {
                body: {
                    name: 'Test place',
                    location: '',
                    longitude: 13, // ok
                    latitude: 14, // ok
                    website: 'http://web.site', // ok
                    photo1: 'http://photo1.png', // ok
                    photo2: 'http://photo2.png', // ok
                    type: 'is it changed?', // will be overridden
                    priceCategory: 6, // not so
                    lastVisited: '2020-05-01',
                    labels: '',
                    description: ''
                }
            };

            const res = {
                locals: {
                    errors: [],
                    locals: { view: null },
                    view: null,
                },
                status: function(statusCode) {
                    this.__resultStatus = statusCode;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
                },
                __renderCalled: false,
                render: function(a, b) {
                    this.__renderCalled = true;
                },
                __resultStatus: -1,
                __resultMessage: null,
            };

            let called = false;
            newPlaceMW({})(req, res, function(err) {
                called = true;
            });
            assert.equal(called, false);
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.notEqual(res.__resultStatus, 400);
            assert.isNull(res.__resultMessage);

            assert.equal(res.locals.errors.length, 4);
            assert.equal(res.locals.errors[1], 'Price value is invalid!');
            assert.equal(res.locals.view, 'insert-place');
            assert.isNotNull(res.locals.place);
            assert.equal(res.locals.place.type, 'accommodation');
            assert.equal(res.__renderCalled, true);
            done();
        });

        it('some other values are invalid', function(done) {
            const req = {
                body: {
                    name: 'Test place',
                    location: 'Good again',
                    longitude: '_$', // not-ok
                    latitude: 'not good', // not-ok
                    website: '/web.site', // not-ok
                    photo1: 'file://photo1.png', // not-ok
                    photo2: 'photo2.png', // not-ok
                    type: 'accommodation', // ok
                    priceCategory: 0, // not so
                    lastVisited: '2020-05-01',
                    labels: ',',
                    description: 'xdd'
                }
            };

            const res = {
                locals: {
                    errors: [],
                    locals: { view: null },
                    view: null,
                },
                status: function(statusCode) {
                    this.__resultStatus = statusCode;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
                },
                __renderCalled: false,
                render: function(a, b) {
                    this.__renderCalled = true;
                },
                __resultStatus: -1,
                __resultMessage: null,
            };

            let called = false;
            newPlaceMW({})(req, res, function(err) {
                called = true;
            });
            assert.equal(called, false);
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.notEqual(res.__resultStatus, 400);
            assert.isNull(res.__resultMessage);

            assert.equal(res.locals.errors.length, 7);
            assert.equal(res.locals.errors[4], 'Invalid second photo url!');
            assert.equal(res.locals.view, 'insert-place');
            assert.isNotNull(res.locals.place);
            assert.equal(res.locals.place.type, 'accommodation');
            assert.equal(res.__renderCalled, true);
            done();
        });
    });

});