const { inspect } = require('util');
const { respondWithError } = require('./responseHelper');

module.exports = {
  handleAndReturnError(res, ex, errorCode) {
    if (ex.response) {
      ex = ex.response;
    }
    if (typeof ex !== 'string') {
      if (ex && ex.data) {
        ex = ex.data.toString();
      }
      else if (ex && ex.message && typeof ex.message === 'string') {
        ex = ex.message;
      }
      else {
        ex = inspect(ex);
      }
    }

    console.error(ex);

    return respondWithError(res, ex, errorCode);
  }
}
