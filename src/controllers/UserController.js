const { handleAndReturnError } = require("../services/errorService")
const { validateUserInGovCarpeta, registerUserInGovCarpeta } = require("../services/govCarpetaService");
const { createUser, validateCreateUser, loginUser } = require("../services/userService");

module.exports = {
  LoginUser(req, res) {
    const {
      nationalId,
      password
    } = req.body;

    try {
      loginUser(nationalId, password).then(user => {
        res.json({
          success: true,
          data: { user }
        });
        res.end();
      }).catch(ex => {
        handleAndReturnError(res, ex);
      });
    }
    catch (ex) {
      handleAndReturnError(res, ex);
    }
  },

  RegisterUser(req, res) {
    const {
      name,
      nationalId,
      email,
      password,
      address,
    } = req.body;
    try {
      const validationError = validateCreateUser(name, nationalId, email, password, address);
      if (validationError) {
        throw new Error(validationError);
      }
      validateUserInGovCarpeta(nationalId).then(({ data, status, statusText }) => {
        if (status === 500 || status === 501 || status === 200) {
          return handleAndReturnError(res, data, status);
        }
        registerUserInGovCarpeta(nationalId, name, address, email).then(({ data, status, statusText }) => {
          console.log('resp from register user in gov carpeta', {data: data.data,status,statusText})
          if (status === 500 || status === 501) {
            return handleAndReturnError(res, data, status);
          }
          createUser(name, nationalId, email, password, address, true).then(user => {
            console.log('resp createUser', user);
            res.json({
              success: true,
              data: { user }
            });
            res.end();
          }).catch(ex => {
            console.log('ex of createUser')
            handleAndReturnError(res, ex);
          });
        }).catch(ex => {
          console.log('ex of register user in gov carpeta')
          handleAndReturnError(res, ex);
        });
      }).catch(ex => {
        console.log('ex of validateUser in gov carp')
        handleAndReturnError(res, ex);
      });
    }
    catch (ex) {
      console.log('general ex')
      handleAndReturnError(res, ex);
    }
  },

  ValidateUser(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        throw new Error('id es requerido.');
      }

      validateUserInGovCarpeta(id).then(ok => {
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
