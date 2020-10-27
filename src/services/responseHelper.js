
module.exports = {  
  respondWithError(res, ex, errorCode = 500) {
    res.status(errorCode);
    res.json({
      success: false,
      error: ex
    });

    res.end();
  }
};
