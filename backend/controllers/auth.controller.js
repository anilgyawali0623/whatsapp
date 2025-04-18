import { ApiError } from "../libs/errorHandler.js";
import { generateToken } from "../libs/utils.js";

import { uploadOnCloudinary } from "../libs/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "enter all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password character must be greater than 6" });
    }
    const user = await User.findOne({
      $or: [{ email }, { fullname }],
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "fullname or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    //     now inserting the token
    if (newUser) {
      //  generate the jwt token

      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user dont exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "incorrect message" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: " loggged out successfully" });
  } catch (error) {
    console.log("error in logout controller ", error.message);
  }
};

export const checkAuth = async (req, res) => {
  // u might get confused how geeting req.user its from the midlleware we are getting req.user= user

  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        fullname:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      generateToken(newUser._id, res);
      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const picture = req.files?.profilePicture[0]?.path;

    if (!picture && !req.files) {
      return res
        .status(400)
        .json({ message: "profile picture is not available" });
    }

    const uploadPicture = await uploadOnCloudinary(picture);
    if (!uploadPicture) {
      return res.status(400).json({
        message: "something went wrong while uploading the picture",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: uploadPicture.secure_url,
      },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("error in updated picture", error.message);
    res.status(500).json({ message: "error in uploading the picture" });
  }
};

