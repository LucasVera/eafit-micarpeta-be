const { inspect } = require('util');
const { respondWithError } = require('./responseHelper');

module.exports = {
  handleAndReturnError(res, ex, errorCode) {
    if (typeof ex !== 'string') {
      if (ex && ex.message && typeof ex.message === 'string') {
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
