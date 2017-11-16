/**
 * DB Seeder - seeds MongoDB with documents from `data.json` on disk
 *
 * To seed, run `npm run-script seed`
 */

var seeder = require('mongoose-seed');
var logger = require('winston');

var seed = function(cb) {
  seeder.connect('mongodb://localhost/db', function() {

    // Load the User and Vinyl model
    seeder.loadModels([
      'models/user.js',
      'models/vinyl.js'
    ]);

    // Drop existing User and Vinyl documents
    seeder.clearModels(['User', 'Vinyl'], function() {

      // Populate from `data.json`
      seeder.populateModels(require('./data.json'), function(err) {
        if (err) {
          logger.error('Error seeding', err);
          if (require.main === module) {
            return process.exit(1);
          } else {
            return cb(err);
          }
        }

        logger.log('Seeding done.');
        if (require.main === module) {
          process.exit(0);
        } else {
          return cb();
        }
      });

    });
  });
};

if (require.main === module) {
  seed(function() {
    logger.log('Seeding complete, exiting.');
  });
}

module.exports = seed;