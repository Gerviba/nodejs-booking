const assert = require('chai').assert;
const grantUserMW = require('../../middleware/permissions/grantUserMW');

describe('grantUserMW middleware ', function () {

    // user not found
    // user good
    // complex grant, revoke

    describe('invalid input', function() {
        it('no id was given', function(done) {
            const req = {
                body: {},
                params: {}
            };

            const res = {
                locals: {},
                redirect: function(place) {
                    this.__resultRedirect = place;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
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
                __resultStatus: -1,
                __resultRedirect: null,
                __resultMessage: null,
            };

            let dontCallMe = false;
            const repos = {
                userRepo: {
                    findOne: function(opts) {
                        return function(err, user) { dontCallMe = true; }
                    }
                }
            };

            grantUserMW(repos, true)(req, res, function (err) {
                assert.fail('Next should not have been called!');
            });
            assert.isNotNull(res.__resultRedirect);
            assert.equal(res.__resultRedirect, '/admin/#users');
            assert.equal(dontCallMe, false);
            done();
        });

        it('user not found', function(done) {
            const req = {
                body: {},
                params: {
                    id: 12
                }
            };

            const res = {
                locals: {},
                redirect: function(place) {
                    this.__resultRedirect = place;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
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
                __resultStatus: -1,
                __resultRedirect: null,
                __resultMessage: null,
            };

            let callMe = false;
            const repos = {
                userRepo: {
                    findOne: function(opts) {
                        this.__opts = opts;
                        return {
                            exec: function(fn) {
                                callMe = true;
                                fn(true, null); // Not found
                            }
                        }
                    },
                    __opts: null
                }
            };

            grantUserMW(repos, true)(req, res, function (err) {
                assert.fail('Next should not have been called!');
            });
            assert.isNull(res.__resultRedirect);
            assert.notEqual(res.__resultRedirect, '/admin/#users');
            assert.equal(callMe, true);
            assert.notTypeOf(repos.userRepo.__opts._id, 'undefined');
            assert.equal(repos.userRepo.__opts._id, 12);
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.equal(res.__resultStatus, 500);
            assert.isNotNull(res.__resultMessage);
            assert.equal(res.__resultMessage, 'User not found');
            done();
        });

        it('save failed', function(done) {
            const req = {
                body: {},
                params: {
                    id: 12
                }
            };

            const res = {
                locals: {},
                redirect: function(place) {
                    this.__resultRedirect = place;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
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
                __resultStatus: -1,
                __resultRedirect: null,
                __resultMessage: null,
            };

            const userObj = {
                admin: null,
                __saveCalled: false,
                save: function(fn) {
                    this.__saveCalled = true;
                    fn(true);
                }
            };

            let execCalled = false;
            const repos = {
                userRepo: {
                    findOne: function(opts) {
                        this.__opts = opts;
                        return {
                            exec: function(fn) {
                                execCalled = true;
                                fn(false, userObj); // Found, but failed to save
                            }
                        }
                    },
                    __opts: null
                }
            };

            grantUserMW(repos, true)(req, res, function (err) {
                assert.fail('Next should not have been called!');
            });
            assert.isNull(res.__resultRedirect);
            assert.notEqual(res.__resultRedirect, '/admin/#users');
            assert.equal(execCalled, true);
            assert.notTypeOf(repos.userRepo.__opts._id, 'undefined');
            assert.equal(repos.userRepo.__opts._id, 12);
            assert.equal(userObj.__saveCalled, true);
            assert.notTypeOf(res.__resultStatus, 'undefined');
            assert.equal(res.__resultStatus, 500);
            assert.isNotNull(res.__resultMessage);
            assert.equal(res.__resultMessage, 'Failed to modify user');
            done();
        });
    });

    describe('valid input', function() {
        it('granted', function(done) {
            const req = {
                body: {},
                params: {
                    id: 12
                }
            };

            const res = {
                locals: {},
                redirect: function(place) {
                    this.__resultRedirect = place;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
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
                __resultStatus: -1,
                __resultRedirect: null,
                __resultMessage: null,
            };

            const userObj = {
                admin: null,
                name: 'test subject',
                __saveCalled: false,
                save: function(fn) {
                    this.__saveCalled = true;
                    fn(false);
                }
            };

            let execCalled = false;
            const repos = {
                userRepo: {
                    findOne: function(opts) {
                        this.__opts = opts;
                        return {
                            exec: function(fn) {
                                execCalled = true;
                                fn(false, userObj); // Found
                            }
                        }
                    },
                    __opts: null
                }
            };

            let nextCalled = false;
            grantUserMW(repos, true)(req, res, function (err) {
                nextCalled = true;
            });
            assert.isNull(res.__resultRedirect);
            assert.notEqual(res.__resultRedirect, '/admin/#users');
            assert.equal(execCalled, true);
            assert.notTypeOf(repos.userRepo.__opts._id, 'undefined');
            assert.equal(repos.userRepo.__opts._id, 12);
            assert.equal(userObj.admin, true);
            assert.equal(userObj.__saveCalled, true);
            assert.equal(res.__resultStatus, -1);
            assert.isNull(res.__resultMessage);
            assert.equal(nextCalled, true);
            done();
        });

        it('revoked', function(done) {
            const req = {
                body: {},
                params: {
                    id: 12
                }
            };

            const res = {
                locals: {},
                redirect: function(place) {
                    this.__resultRedirect = place;

                    return {
                        res: res,
                        send: function(message) {
                            res.__resultMessage = message;
                        }
                    }
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
                __resultStatus: -1,
                __resultRedirect: null,
                __resultMessage: null,
            };

            const userObj = {
                admin: null,
                name: 'test subject',
                __saveCalled: false,
                save: function(fn) {
                    this.__saveCalled = true;
                    fn(false);
                }
            };

            let execCalled = false;
            const repos = {
                userRepo: {
                    findOne: function(opts) {
                        this.__opts = opts;
                        return {
                            exec: function(fn) {
                                execCalled = true;
                                fn(false, userObj); // Found
                            }
                        }
                    },
                    __opts: null
                }
            };

            let nextCalled = false;
            grantUserMW(repos, false)(req, res, function (err) {
                nextCalled = true;
            });
            assert.isNull(res.__resultRedirect);
            assert.notEqual(res.__resultRedirect, '/admin/#users');
            assert.equal(execCalled, true);
            assert.notTypeOf(repos.userRepo.__opts._id, 'undefined');
            assert.equal(repos.userRepo.__opts._id, 12);
            assert.equal(userObj.admin, false);
            assert.equal(userObj.__saveCalled, true);
            assert.equal(res.__resultStatus, -1);
            assert.isNull(res.__resultMessage);
            assert.equal(nextCalled, true);
            done();
        });
    });
});