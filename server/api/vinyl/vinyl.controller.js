var Vinyl = require('../../models/vinyl');

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