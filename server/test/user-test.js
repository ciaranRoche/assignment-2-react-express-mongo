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

  describe('/GET users/:id', function(){
    it('should return a single user', function(done){
      User.findOne({}, function(err, user){
        var id = user._id;

        chai.request(url)
          .get('/api/users/' + id)
          .end(function(err, res){
            res.should.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.firstname).to.be.a('string');
            done();
          })
        })
      })
    })
  
  describe('/DELETE user/:id', function() {
    it('should delete a single user', function(done){
      User.findOne({}, function(err, user){
        var id = user._id;

        chai.request(url)
          .delete('/api/users/' + id)
          .end(function(err, res){
            res.should.have.status(200);

            User.findById(id, function(err, user){
              expect(user).to.be.a('null');
              done();
            })
          })
        })
      })
    })

  describe('/POST user/', function(){
    it('should create a single user', function(done) {
      var user = {
        'firstname' : 'ciaran',
        'surname' : 'roche',
        'gender' : 'male'
      }

      chai.request(url)
        .post('/api/users/')
        .send(user)
        .end(function(err, res){
          res.should.have.status(200);
          expect(res.body.firstname).to.be.eql('ciaran');
          done();
        })
      })
    })

  describe('/PUT user/', function(){
    it('should update a single user', function(done){
      var payload = {
        'firstname' : 'uncle acid'
      }
      User.findOne({}, function(err, user){
        var id = user._id;
      chai.request(url)
        .put('/api/users/' + id)
        .send(payload)
        .end(function(err, res){
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.firstname).to.be.eq('uncle acid');
          done();
        })
      })
    })
  })
})