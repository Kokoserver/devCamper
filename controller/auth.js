import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/User.js";
import sendTokenResponse from "../utils/sendTokenResponse.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc register user
// @route api/v1/auth/register
// @method POST
// @access public

export const authRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendTokenResponse(user, 200, res);
});

// @desc login user
// @route api/v1/auth/login
// @method POST
// @access public
export const authLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("please provide a valid email and password"),
      400
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credential", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credential", 401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc auth user details
// @route api/v1/auth/me
// @method GET
// @access private
export const authUserDetails = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, data: req.user });
});
