class MyError {
  static send = (res, msg) => {
    return res.status(401).json({
      timestamp: Date.now(),
      message: msg,
      error: true,
    });
  };
}

module.exports = {
  MyError,
};
