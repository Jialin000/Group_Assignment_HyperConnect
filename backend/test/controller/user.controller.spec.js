var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var usersController = require('../../controllers/usersController');
const User = require('../../models/users');



describe('userController', function () {
    const mockResponse = (fake) => {
        return {
            clearCookie: fake,
            status: function(code){this.code = code; return this;},
            json: function(message){this.message = message;}
        };
    }
    const mockRequest = (session, body) => ({
        session,
        body,
    });
        describe('userLogOut', function () {
            it("Log out succeeded", function () {
                const fake = sinon.fake();
                const req = mockRequest({},{});
                const res = mockResponse(fake);
                usersController.userLogOut(req, res);
                const result = fake.lastArg;
                // console.log(res)
                expect(res.code).to.equal(200);
            })
        })
    })




