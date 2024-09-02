import Auth from "../models/authModel/auth.js";
import { faker } from "@faker-js/faker";

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

export const updateProfile = async (req, res) => {
  const { firebaseId } = req.params;
  const { name, phoneNumber, address } = req.body;

  if (!firebaseId) {
    return res.status(400).json({ message: "Firebase ID is required." });
  }

  try {
    const user = await Auth.findOne({ firebaseId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const generateUsersAndStore = async (req, res) => {
  const { totalUsers = 50 } = req.body;

  try {
    const usersPerMonth = [];
    let totalCreatedUsers = 0;
    const maxUsersPerMonth = 10;
    const minUsersPerMonth = 3;

    let remainingUsers = totalUsers;

    for (let i = 0; i < 12; i++) {
      if (remainingUsers <= 0) break;

      const maxUsersForThisMonth = Math.min(maxUsersPerMonth, remainingUsers);
      const numberOfUsers =
        Math.floor(
          Math.random() * (maxUsersForThisMonth - minUsersPerMonth + 1)
        ) + minUsersPerMonth;

      const monthUsers = [];

      const startOfMonth = new Date(new Date().getFullYear(), i, 1);
      const endOfMonth = new Date(new Date().getFullYear(), i + 1, 0);

      for (
        let j = 0;
        j < numberOfUsers && totalCreatedUsers < totalUsers;
        j++
      ) {
        const randomDate = new Date(
          startOfMonth.getTime() +
            Math.random() * (endOfMonth.getTime() - startOfMonth.getTime())
        );

        const newUser = new Auth({
          firebaseId: faker.finance.bitcoinAddress(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          address: faker.location.streetAddress(true),
          createdAt: randomDate,
        });

        monthUsers.push(newUser);
        totalCreatedUsers++;
        remainingUsers--;
      }

      await Auth.insertMany(monthUsers);

      usersPerMonth.push({ month: i + 1, users: monthUsers });
    }

    res.status(201).json({
      message: "Users generated and stored in MongoDB",
      totalCreatedUsers,
      data: usersPerMonth,
    });
  } catch (error) {
    console.error("Error generating users:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const getUsersAndCount = async (req, res) => {
  try {
    const result = await Auth.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          count: 1,
        },
      },
    ]);

    const userCounts = Array.from({ length: 12 }, () => 0);

    result.forEach(({ month, count }) => {
      userCounts[month - 1] = count;
    });

    res.status(200).json({
      message: "User counts for each month",
      userCounts,
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
