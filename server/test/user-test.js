var logger = require('winston');
var server = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../seed/seed');
var User = require('../models/user');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8002';

describe('User', function(){
  before(function (done){
    server
      .listen(8002, function () {
        logger.info('Listening as http"//localhost:8002 for acceptance tests');

        seed(function(err){
          done(err);
        });
      });
  });
  
  describe('/GET users', function() {
    it('should return a list of users', function(done) {
      chai.request(url)
        .get('/api/users/')
        .end(function(err, res){
          res.body.should.be.a('array');
          res.should.have.status(200);
          done();
        })
    })
  })
})