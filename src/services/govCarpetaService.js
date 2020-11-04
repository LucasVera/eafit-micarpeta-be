const { default: axios } = require("axios");

const { GOV_CARPETA_API_URL, OPERATOR_NAME, OPERATOR_ID } = process.env;

module.exports = {
  validateUserInGovCarpeta(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${GOV_CARPETA_API_URL}/validateCitizen/${id}`).then(({ data, status, statusText }) => {
        console.log('resp from govCarpeta-validateCitizen', {
          status: `${status} - ${statusText}`,
          data
        });
        return resolve({ data, status, statusText });
      }).catch(ex => {
        return reject(ex);
      });
    });
  },

  registerUserInGovCarpeta(id, name, address, email) {
    return new Promise((resolve, reject) => {
      axios.post(`${GOV_CARPETA_API_URL}/registerCitizen`, {
        id,
        name,
        address,
        email,
        operatorId: OPERATOR_ID,
        operatorName: OPERATOR_NAME,
      }).then(({ data, status, statusText }) => {
        return resolve({ data, status, statusText });
      }).catch(ex => reject(ex));
    });
  },

  authenticateDocument(id, urlDocument, title) {
    const url = encodeURIComponent(urlDocument);
    return new Promise((resolve, reject) => {
      axios.get(`${GOV_CARPETA_API_URL}/authenticateDocument/45/${url}/${title}`).then(({ data, status, statusText }) => {
        return resolve({ data, status, statusText });
      }).catch(ex => reject(ex));
    });
  }
}
