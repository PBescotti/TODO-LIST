const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});
const Users = mongoose.model("Users", UserSchema);

async function getAllUsers() {
  return await Users.find();
}

async function getUserFromID(id) {
  return await Users.findById(id);
}

async function getUserFromEmail(email) {
  return await Users.findOne({ email: String(email) });
}

async function register(data) {
  const { email, password, username } = data;

  if (!email || !validator.isEmail(email))
    return { success: false, error: "EMAIL_INVALID" };

  if (!validator.isStrongPassword(password))
    return { success: false, error: "PASSWORD_WEAK" };

  const existingUser = await getUserFromEmail(email);
  if (existingUser) return { success: false, error: "EMAIL_ALREADY_IN_USE" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Users({ username: username, email: email, password: hashedPassword });

  try {
    const saved = await newUser.save();
    return { success: true, user: saved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function login(data) {
  const user = await getUserFromEmail(email);
  if (!user) return false;

  return bcrypt.compare(data.password, user.password);
}

module.exports = {
  getAllUsers,
  getUserFromID,
  register,
  login,
};
