import User from '../models/userModel/user.js';

export const createUser = async (req, res) => {
  const {name, email, phoneNumber, address} = req.body;

  if (!name || !email) {
    return res.status(400).json({message: 'Name and Email are required'});
  }

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }
    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
    });

    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({createdAt: -1}).exec();
    res.status(200).json({message: 'Users retrieved successfully', users});
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

export const getUser = async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({message: 'User retrieved successfully', user});
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

export const updateUser = async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({message: 'User updated successfully', user});
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message});
  }
};
