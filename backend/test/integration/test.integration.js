var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var usersController = require('../../controllers/usersController');
const User = require('../../models/users');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


var url = 'http://localhost:8080';
describe('integration test', function() {
    describe('usersLogIn', function () {
        it('user not found ', function (done) {

            chai.request(url)
                .post('/users/login')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(401);
                    // console.log(res.body);
                    done();
                });
        });
        it('password wrong', function (done) {

            chai.request(url)
                .post('/users/login')
                .send({'email': '1@q.com', 'password': 'wrong'})
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(401);
                    // console.log(res.body);
                    done();
                });
        });
        it('login in successfully ', function (done) {

            chai.request(url)
                .post('/users/login')
                .send({'email': '1@q.com', 'password': '1'})
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    // console.log(res.body);
                    done();
                });
        });
    })
        // test user sign up using a exist email
    describe('userSignUp', function() {
        it('user already exist ', function (done) {

            chai.request(url)
                .post('/users/signup')
                .send({'email': '1@q.com' , 'password': '1'})
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(409);
                    // console.log(res.body);
                    done();
                });
        });

    })

})

