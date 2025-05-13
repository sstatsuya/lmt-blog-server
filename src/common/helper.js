function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    if (i % 6 === 0 && i > 0) result += "-";
    else
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "Bearer " + result;
}

const MyResponse = ({
  error = "",
  status = 401,
  res,
  data,
}) => {
  if (error.length > 0)
    return res.status(status).json({
      isError: true,
      message: error,
    });
  else res.json(data);
};

const getRandomOTP = (digits = 6) => {
  let result = "";
  for (let i = 0; i < digits; i++) {
    result += Math.floor(Math.random() * 9)
  }
  return result
}

module.exports = { makeid, MyResponse, getRandomOTP };
