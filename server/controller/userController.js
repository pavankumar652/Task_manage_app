import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { sendToken } from "../utils/jwtToken.js";
import Errorhandler from "../middleware/error.js";

/* ===========================
   REGISTER USER (NO AVATAR)
=========================== */
export const register = catchAsyncErrors(async (req, res, next) => {
     //console.log("Request Body:", req.body);
  const { name, email, phone, password } = req.body || {};

  if (!name || !email || !phone || !password) {
    return next(new Errorhandler("Please fill full form!", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new Errorhandler("User already exists!", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password
  });

  sendToken("User Registered Successfully!", user, res, 201);

});

/* ===========================
   LOGIN USER
=========================== */
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Invalid email or password!", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password!", 400));
  }

  // Only sendToken, it will handle the response
  sendToken("User Logged In Successfully!", user, res, 200);
});

/* ===========================
   LOGOUT USER
=========================== */
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});

/* ===========================
   GET MY PROFILE
=========================== */
export const myProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});