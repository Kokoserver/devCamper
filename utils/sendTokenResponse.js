export default async function (user, statusCode, res) {
  // get user token
  const token = user.getSignedJwt();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  return res
    .status(statusCode)
    .cookie("session_token", token, options)
    .json({ success: true, token });
}
