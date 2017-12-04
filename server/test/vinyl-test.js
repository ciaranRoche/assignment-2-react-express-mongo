var logger = require('winston');
var server = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../seed/seed');
var Vinyl = require('../models/vinyl');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';

describe('Vinyl', function () {
  // Before our test suite
  before(function (done) {
    // Start our app on an alternative port for acceptance tests
    server
      .listen(8001, function () {
        logger.info('Listening at http://localhost:8001 for acceptance tests');

        // Seed the DB with our users
        seed(function (err) {
          done(err);
        });
      });
  });

  describe('/GET vinyls', function() {
    it('should return a list of vinyls', function(done) {
      chai.request(url)
        .get('/api/vinyl/')
        .end(function(err, res) {
          res.body.should.be.a('array');
          res.should.have.status(200);
          res.body.length.should.be.eql(14);
          done();
        });
    });
  });

  describe('/GET vinyl/:id', function() {
    it('should return a single vinyl', function(done) {
      // Find a user in the DB
      Vinyl.findOne({}, function(err, vinyl) {
        var id = vinyl._id;

        // Read this user by id
        chai.request(url)
          .get('/api/vinyl/' + id)
          .end(function(err, res) {
            res.should.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.artist).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('/DELETE vinyl/:id', function() {
    it('should delete a single vinyl', function(done) {
      //Find a user in the DB
      Vinyl.findOne({}, function(err, user) {
        var id = user._id;
        // Delete user by id
        chai.request(url)
          .delete('/api/vinyl/' + id)
          .end(function(err, res) {
            res.should.have.status(200);
            // Find user with same id should be null
            Vinyl.findById(id, function(err, user) {
              expect(user).to.be.a('null');
              done();
            });
          });
      });
    });
  });

  describe('/POST vinyl/', function() {
    it('should create a single vinyl', function(done) {
      var vinyl = {
        'artist' : 'Sleep',
        'album' : 'Holy Mountain',
        'genre' : 'Doom'
        };

      // Create a new user
      chai.request(url)
        .post('/api/vinyl/')
        .send(vinyl)
        .end(function(err, res) {
          res.should.have.status(200);
          expect(res.body.artist).to.be.a('string');
          done();
        });
    });
  });

  describe('/PUT vinyl/', function() {
    it('should update a single vinyl', function(done){
      var payload = {
        	 'likes': 42 
      };
      Vinyl.findOne({}, function(err, vinyl){
        var id = vinyl._id;
      chai.request(url)
        .put('/api/vinyl/' + id)
        .send(payload)
        .end(function(err, res){
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.likes).to.be.eq(42);
          done();
        })
      })
    })
  });

});