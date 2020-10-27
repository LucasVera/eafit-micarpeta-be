const { SayHi } = require("../controllers/TestController");
const { ValidateUser } = require("../controllers/UserController");

module.exports = function(app) {
  app.get('/say-hi', SayHi);
  app.post('/validate-user', ValidateUser);
};
