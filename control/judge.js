const userModel = require("../model/operateDb");
// 引入node核心模块 加密
const crypto = require('crypto')
// 引入token模块
const token = require("../utils/token");

const register = (req, res) => {
    const {
        userName,
        passWord
    } = req.body;

    userModel.findUser({
        userName
    }, findUserCb);

    function findUserCb(result) {

        if (result.length > 0) {
            res.json({
                state: false,
                info: "用户名已存在！"
            })
        } else {

            //创建sha256算法
            const hash = crypto.createHash('sha256');
            //需要加密的文件
            hash.update(passWord);
            //得到加密的文件
            //hash.digest('hex')
            userModel.saveUser({
                userName,
                passWord: hash.digest('hex')
            }, (result) => {
                res.json({
                    state: true,
                    info: "注册成功！"
                })
            });
        }
    }
}

const login = (req, res) => {

    const {
        userName,
        passWord
    } = req.body;

    userModel.findUser({
        userName
    }, loginFindUserCb);

    function loginFindUserCb(result) {
        if (result.length > 0) {
            //创建sha256算法
            const hash = crypto.createHash('sha256');

            //需要加密的文件
            hash.update(passWord);

            //得到加密的文件
            //hash.digest('hex')

            if (result[0].passWord === hash.digest('hex')) {
                //使用token向客户端种一个cookie
                const tokenData = token.createToken({
                    passWord
                }, "vip");
                res.cookie("token", tokenData);
                res.cookie("user", userName);
     
                res.json({
                    state: true,
                    info: "登陆成功！"
                })
            } else {
                res.json({
                    state: false,
                    info: "密码错误！"
                })
            }

        } else {
            res.json({
                state: false,
                info: "该用户名不存在！"
            })
        }
    }
}

module.exports = {
    register,
    login
}