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
  console.log(vinyl)
  vinyl.save((err, createdVinylObject) => {
    if(err){
      res.status(500).send(err)
    }
    res.status(200).send(createdVinylObject);
  })
}