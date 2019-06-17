const jwt = require("jsonwebtoken");

//创建一个token
const createToken = (tokenInfo, secret) => {
    return jwt.sign(tokenInfo, secret, {
        expiresIn: 60 * 60
    });
}

//验证token是否正确
const tokenVerify = (res, token, secret, cb) => {
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            res.json({
                state: false,
                info: "登录信息过期，请重新登陆！"
            })
        } else {
            cb();
        }
    });
}


module.exports = {
    createToken,
    tokenVerify
}