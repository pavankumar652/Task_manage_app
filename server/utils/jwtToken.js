export const sendToken = (message, user, res, statusCode) => {
  const token = user.getJWTToken();

  const cookieExpireDays = process.env.COOKIE_EXPIRE || 5;

  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      user,
      token,
    });
};