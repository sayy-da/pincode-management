import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    Name: { type: String },
    District: { type: String },
    State: { type: String },
    BranchType: { type: String }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: AddressSchema, required: true }
  },
  { timestamps: true }
);


export default mongoose.model("User", UserSchema);
