const { UploadFileMocked, GetUserFiles } = require("../controllers/FileController");
const { SayHi } = require("../controllers/TestController");
const { ValidateUser, RegisterUser, LoginUser } = require("../controllers/UserController");

module.exports = function(app) {
  app.get('/say-hi', SayHi);
  app.get('/files/:userId', GetUserFiles);
  app.post('/user/validate', ValidateUser);
  app.post('/user/register', RegisterUser);
  app.post('/user/login', LoginUser);
  app.post('/file/upload/:id', UploadFileMocked);
};
