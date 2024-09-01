import Auth from "../models/authModel/auth.js";

export const signUpUser = async (req, res) => {
  const { firebaseId, name, email, phoneNumber, address } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = new Auth({
      firebaseId,
      name,
      email,
      phoneNumber,
      address,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllSignUpUsers = async (req, res) => {
  try {
    const users = await Auth.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getSignUpUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Auth.findOne({ firebaseId: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
