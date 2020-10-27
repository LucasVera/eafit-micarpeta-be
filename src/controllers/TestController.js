const { handleAndReturnError } = require("../services/errorService");
const { sayHi } = require("../services/TestService")

module.exports = {
  SayHi(req, res) {
    try {
      const hi = sayHi();

      res.json({
        success: true,
        data: { hi }
      });
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  }
}
