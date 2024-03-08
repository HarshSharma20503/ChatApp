import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { generateJWTToken } from "../utils/GenerateToken.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("******** registerUser Function ********");

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  console.log("Existing User", existingUser);
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const picLocalPath = req.files?.pic[0]?.path;
  console.log("Pic Local Path", picLocalPath);
  if (!picLocalPath) {
    throw new ApiError(400, "Profile pic is required");
  }

  const pic = await uploadOnCloudinary(picLocalPath);

  console.log("Pic URL", pic);

  if (!pic) {
    throw new ApiError(500, "Failed to upload profile pic");
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateJWTToken(user._id),
        },
        "User registered successfully"
      )
    );
  }

  throw new ApiError(500, "Failed to create User");
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("******** loginUser Function ********");
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  console.log("User details", email, password);

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
        },
        "User logged in successfully"
      )
    );
  }
  throw new ApiError(401, "Invalid email or password");
});

export { registerUser, loginUser };
