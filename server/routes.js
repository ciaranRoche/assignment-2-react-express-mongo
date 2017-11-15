module.exports = function(app){
  app.use('/api/users', require('./api/users/index'));
  app.use('/api/vinyl', require('./api/vinyl/index'));
}