import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("Users", UsersSchema);

export default UserModel;
