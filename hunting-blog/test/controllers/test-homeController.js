const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../../server');
const { TEST_DATABASE_URL } = require('../../config');
chai.use(chaiHTTP);

describe('homeController', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    after(function() {
        return closeServer();
    });
    it('should show the home page', function(done) {
        chai.request(app).get('/')
        .then(function(res) {
            console.log(res.text);
            expect(res.text).to.equal('This is the home page. yay!');
            done();
        })
    });
});