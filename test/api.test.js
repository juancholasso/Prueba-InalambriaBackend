require('../app/config/env');

var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
var jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const baseUrl = `localhost:${process.env.PORT}`;

describe('Server', ()=>{
    it('Health Check', (done) => {
        chai.request(baseUrl)
        .get("/health-check")
        .end((err,res)=> {
            expect(res).to.have.status(200);
            done();
        });
    });
    it('Health Check', (done) => {
        chai.request(baseUrl)
        .post("/api/login")
        .send({ email:"jpcamargol@unbosque.edu.co", password: "1234Juan" })
        .end((err,res)=> {
            var token = jwt.verify(res.body.token, process.env.SEED);
            assert.equal(token.data.email,"jpcamargol@unbosque.edu.co");
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Authentication', ()=>{

    describe('Login', ()=>{
        it('Login vefify token', (done) => {
            chai.request(baseUrl)
            .post("/api/login")
            .send({ email:"jpcamargol@unbosque.edu.co", password: "1234Juan" })
            .end((err,res)=> {
                var token = jwt.verify(res.body.token, process.env.SEED);
                assert.equal(token.data.email,"jpcamargol@unbosque.edu.co");
                expect(res).to.have.status(200);
                done();
            });
        });
    });

});