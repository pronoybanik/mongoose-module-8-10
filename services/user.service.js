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

exports.updateUserByIdService = async (userId, data) => {
    const result = await User.updateOne(
        { _id: userId },
        data,
        {
            runValidators: true,
        }
    );

    return result;
};


exports.deleteUserByIdService = async (id) => {
    const result = await User.deleteOne({ _id: id });
    return result;
};