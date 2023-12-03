const User = require("../models/user")

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.getAllUserService = async () => {
    return await User.find({});
};
exports.getUserByIdService = async (id) => {
    return await User.findById(id);
};

// exports.findUserByToken = async (token) => {
//   return await User.findOne({ confirmationToken: token });
// };