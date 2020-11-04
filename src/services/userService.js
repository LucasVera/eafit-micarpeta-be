const User = require("../db/models/User")

module.exports = {
  validateCreateUser (name, nationalId, email, password, address) {
    let validationMessage = '';
    if (!name) validationMessage += 'El nombre es requerido. ';
    if (!nationalId) validationMessage += 'La cédula es requerida. ';
    if (!email) validationMessage += 'El correo electrónico es requerido. ';
    if (!password) validationMessage += 'La contraseña es requerida. ';
    if (!address) validationMessage += 'La dirección es requerida. ';

    return validationMessage;
  },

  createUser(name, nationalId, email, password, address, validCitizen) {
    if (!validCitizen) {
      throw new Error('El usuario debe ser un ciudadano validado por GovCarpeta.');
    }
    return User.create({
      name,
      nationalId,
      email,
      password,
      address,
      validCitizen
    });
  },

  loginUser(nationalId, password) {
    return new Promise((resolve, reject) => {
      User.findOne({ nationalId, password }).then(user => {
        if (!user) {
          return reject('No encontrado. Debes registrate primero');
        }

        return resolve(user);
      }).catch(ex => {
        return reject(ex);
      });
    });
  },

  findUserByNationalId(nationalId) {
    return User.findOne({ nationalId });
  }
};
