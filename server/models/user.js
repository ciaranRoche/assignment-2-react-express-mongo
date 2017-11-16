var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
  firstname: Schema.Types.Mixed,
  surname: Schema.Types.Mixed,
  gender: String,
  email: String,
  password: String,
  address: String,
  about: String,
  collections: [String],
  profile_image: String
});

module.exports = User;