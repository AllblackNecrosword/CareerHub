import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../ultils/cloudinary.js";
import getDataUri from "../ultils/geturi.js";

const signupHandler = async (req, res) => {
  try {
    const { username, email, phoneNumber, password, role } = req.body;
    if (!username || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something Missing", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = bcrypt.hashSync(password, 8);

    let profileUrl = "";

    if (req.file) {
      const fileuri = getDataUri(req.file);
      // Upload to Cloudinary from the data URI content
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
      profileUrl = cloudResponse.secure_url;
    }

    await User.create({
      username,
      email,
      phoneNumber,
      password: hashpassword,
      role,
      profile: {
        // profile: cloudResponse.secure_url,
        profile: profileUrl,
      },
    });

    return res.status(200).json({ message: "Account created Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "Something is missing" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const Password = bcrypt.compareSync(password, user.password);
    if (!Password) {
      return res
        .status(400)
        .json({ message: "Invalid Password! Please try again" });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome ${user.username}`,
        user,
      });
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutHandler = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const updateprofileHandler = async (req, res) => {
  try {
    const { username, email, phoneNumber, bio, skills } = req.body;
    // console.log(req.body);
    // console.log(req.file);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (req.file) {
      const fileuri = getDataUri(req.file);
      // Upload to Cloudinary from the data URI content
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
        resource_type: "raw",
      });
      user.profile.resume = cloudResponse.secure_url; // Store the Cloudinary URL in the database
      user.profile.resumeName = req.file.originalname; // Store the original file name
    }
    await user.save();
    res.status(200).json({ message: "User Updated Successfully", user });
  } catch (error) {
    console.log(error);
  }
};

// const tryout = (req, res) => {
//   res.status(200).json({ message: "i am working" });
// };

export { loginHandler, signupHandler, logoutHandler, updateprofileHandler };
