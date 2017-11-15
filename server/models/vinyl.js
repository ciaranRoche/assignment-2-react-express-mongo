var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vinyl = mongoose.model('Vinyl', {
  artist: Schema.Types.Mixed,
  album: Schema.Types.Mixed,
  image: String,
  genre: String,
  year: String,
  notes: String,
  likes: Number,
  reviews: [{
    user: Number,
    name: String,
    date: String,
    image: String,
    summary: String
  }]
});

module.exports = Vinyl;