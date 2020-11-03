
module.exports = {  
  respondWithError(res, ex, errorCode = 500) {
    res.json({
      success: false,
      error: ex
    });

    res.end();
  }
};
