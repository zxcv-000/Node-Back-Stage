let mongoose = require("../db/database").mongoose;

const User = mongoose.model("user", {
    userName: String,
    passWord: String
});

const findUser = (userInfo, userCb) => {
    User.find(userInfo).then((result) => {
        userCb(result);
    })
}

const saveUser = (userInfo, userCb) => {
    const user = new User(userInfo);
    user.save().then((result) => {
        userCb(result);
    })
}

module.exports = {
    findUser,
    saveUser
}