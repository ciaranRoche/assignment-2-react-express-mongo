var User = require('../../models/user');

// returns all the users
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

// creates a user
exports.create = function(req, res){
  var user = new User(req.body);
  user.save((err, createdUserObject) => {
    if(err){
      res.status(500).send(err)
    }
    res.status(200).send(createdUserObject)
  })
}