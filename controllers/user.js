import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const resgister = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Fill all the Field" });
    }
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);

    if (existingUser) {
      return res.status(409).json({ message: "User Already exist" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);

    // const user = await User.create({ name, email, password }); //method-1
    const user = new User({ name, email, role, password: hashPass }); //method-2
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    console.log(token);
    res.status(201).send({
      message: "User Created and Saved Successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please Enter both Fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    // console.log(matchingUser);
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({ message: "User Unauthorized or Invalid" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    console.log(token);

    res.status(200).json({
      message: "User found and return successfully",
      user: user,
      token,
    });
  } catch (error) {
    console.log("Error : ", error);
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie();
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error : ", error);
  }
};
export const home = (req, res) => {
  try {
    return res.status(200).send("This is Home Page");
  } catch (error) {
    console.log("Error : ", error);
  }
};
export const adminBlock = (req, res) => {
  try {
    return res.status(200).send("This is Admin Page");
  } catch (error) {
    console.log(error);
  }
};
