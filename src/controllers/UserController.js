const { handleAndReturnError } = require("../services/errorService")
const axios = require('axios');
const { validateUser } = require("../services/govCarpetaService");

module.exports = {
  ValidateUser(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        throw new Error('id es requerido.');
      }

      validateUser(id).then(ok => {
        console.log({ ok })
        res.json({
          success: true,
          data: { ok }
        });
  
        res.end();
      }).catch(ex => {
        throw ex
      });
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  }
};
