const { UploadFile } = require("../controllers/FileController");
const { SayHi } = require("../controllers/TestController");
const { ValidateUser, RegisterUser, LoginUser } = require("../controllers/UserController");

module.exports = function(app) {
  app.get('/say-hi', SayHi);
  app.post('/user/validate', ValidateUser);
  app.post('/user/register', RegisterUser);
  app.post('/user/login', LoginUser);
  app.post('/file/upload', UploadFile);
};
