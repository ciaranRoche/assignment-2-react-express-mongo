var User = require('../../models/user');

exports.index = function(req, res){
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }
    res.json(users);
  });
}