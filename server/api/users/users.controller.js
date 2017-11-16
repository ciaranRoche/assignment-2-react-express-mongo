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

//get user by id
exports.show = function (req, res){
  var id = req.params.id;
  User.findOne({
    _id : id
  }, function(err, user){
    if(err){
      res.status(500).send(err)
    }
    res.status(200).send(user)
  })
}

// get user by email
exports.get = function (req, res){
  var email = req.params.email;
  User.findOne({
    email : email
  }, function(err, user){
    if(err){
      res.status(500).send(err)
    }
    res.status(200).send(user)
  })
}

// updates the user
exports.update = function(req, res){
  var id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(500).send(err)
    }else{
      user.firstname = req.body.firstname || user.firstname;
      user.surname = req.body.surname || user.surname;
      user.gender = req.body.gender || user.gender;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.address = req.body.address || user.address;
      user.about = req.body.about || user.about;
      user.collections = req.body.collections || user.collections;
      user.profile_image = req.body.profile_image || user.profile_image;

      user.save((err, user) => {
        if(err){
          res.status(500).send(err)
        }
        res.status(200).send(user)
      })
    }
  })
}

// deletes a user
exports.destroy = function (req, res){
  User.findByIdAndRemove(req.params.id, (err, user) => {
    var response = {
      message : 'User is no more',
      id : user._id
    };
    if(err){
      res.status(500).send(err)
    }
    res.status(200).send(response);
  })
}