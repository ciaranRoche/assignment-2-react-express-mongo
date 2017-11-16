var Vinyl = require('../../models/vinyl');

// returns all the vinyls
exports.index = function (req, res) {
  Vinyl.find({}, function (err, users) {
    if (err) {
      return res
        .status(500)
        .json({
          error: "Error listing users: " + err
        });
    }
    res.json(users);
  });
}

// creates a vinyl
exports.create = function (req, res){
  var vinyl = new Vinyl(req.body);
  vinyl.save((err, createdVinylObject) => {
    if(err){
      res.status(500).send(err)
    }
    res.status(200).send(createdVinylObject);
  })
}

// get vinyl by id 
exports.show = function (req, res){
  var id = req.params.id;
  Vinyl.findOne({
    _id : id
  }, function(err, vinyl){
    if (err){
      res.status(500).send(err)
    }
    res.status(200).send(vinyl)
  })
}

// updates the vinyl 
exports.update = function (req, res){
  var id = req.params.id;
  Vinyl.findById(id, (err, vinyl) => {
    if (err) {
      res.status(500).send(err)
    }else{
      vinyl.artist = req.body.artist || vinyl.artist;
      vinyl.album = req.body.album || vinyl.album;
      vinyl.image = req.body.image || vinyl.image;
      vinyl.genre = req.body.genre || vinyl.genre;
      vinyl.year = req.body.year || vinyl.year;
      vinyl.notes = req.body.notes || vinyl.notes;
      vinyl.likes = req.body.likes || vinyl.likes;
      vinyl.reviews = req.body.reviews || vinyl.reviews;

      vinyl.save((err, vinyl) => {
        if(err){
          res.status(500).send(err)
        }
        res.status(200).send(vinyl)
      })
    }
  })
}

// deletes the vinyl
exports.destroy = function (req, res){
  Vinyl.findByIdAndRemove(req.params.id, (err, vinyl) => {
    var response = {
      message : 'Vinyl deleted',
      id : vinyl._id
    };
    res.status(200).send(response)
  })
}