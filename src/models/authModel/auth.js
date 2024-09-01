import mongoose from "mongoose";
const { Schema } = mongoose;

const authSchema = new Schema(
  {
    firebaseId: {
      type: String,
      required: false,
      unique:true
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
