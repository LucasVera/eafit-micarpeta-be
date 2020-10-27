const { default: axios } = require("axios");

const { GOV_CARPETA_API_URL } = process.env;

module.exports = {
  validateUser(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${GOV_CARPETA_API_URL}/validateCitizen/${id}`).then(({ data }) => {
        return resolve(data);
      }).catch(ex => {
        return reject(ex);
      });
    });
  }
}
