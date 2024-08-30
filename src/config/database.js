import mongoose from "mongoose";
const DATABASE_URI =
  "mongodb+srv://salimbhandi07:H0ku5309ydEzBxqF@cluster0.s3sgs.mongodb.net/";
const connectDB = async () => {
  try {
    // await mongoose.connect(DATABASE_URI);
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error : ", err);
  }
};

export default connectDB;
