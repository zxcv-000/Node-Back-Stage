const path = require("path");
const getCookie = require("../utils/getCookie").getCookie;
const tokenVerify = require("../utils/token.js").tokenVerify;
const jobDb = require("../model/jobDb");

const show = () => {

};


const jobList = (req, res) => {
    const token = getCookie(req, "token");
    tokenVerify(res, token, "vip", tokenVerifyCb);

    function tokenVerifyCb() {
        jobDb.findJobInfo(findInfoCb);

        function findInfoCb(result) {
            res.json({
                state: true,
                info: "ok",
                data: result
            })
        }
    }
};

const modify = (req, res) => {
    const token = getCookie(req, "token");
    tokenVerify(res, token, "vip", tokenVerifyCb);

    function tokenVerifyCb() {
        const {
            jobName,
            jobPrice,
            jobAsk,
            companyName,
            id
        } = req.body;
        const jobLogo = req.files.jobLogo[0].path;
        const url = "http://localhost:3000/img/" + path.parse(jobLogo).base;

        jobDb.modifyJobInfo({
            _id: id
        }, {
            jobName,
            jobPrice,
            jobAsk,
            companyName,
            jobLogo: url
        }, modifyJobCb);

        function modifyJobCb(result) { 
    
                res.json({
                    state: true,
                    info: "数据修改成功！"
                })
        }
    }
};

const addJob = (req, res) => {
    const {
        jobName,
        jobPrice,
        jobAsk,
        companyName
    } = req.body;

    // tokenVerifyCb 必须先声明再使用，声明提升，赋值不会
    let tokenVerifyCb = () => {

        jobDb.saveJobInfo({
            jobName,
            jobPrice,
            jobAsk,
            companyName,
            jobLogo: url
        }, saveJObInfoCb);
    };

    function saveJObInfoCb() {
        res.json({
            state: true,
            info: "数据添加成功！"
        })
    }

    const jobLogo = req.files.jobLogo[0].path;
    const url = "http://localhost:3000/img/" + path.parse(jobLogo).base;

    const token = getCookie(req, "token");
    tokenVerify(res, token, "vip", tokenVerifyCb);
};

const removeInfo = (req, res) => {
    const {
        id
    } = req.query;
    const token = getCookie(req, "token");
    tokenVerify(res, token, "vip", tokenVerifyCb);

    function tokenVerifyCb() {

        jobDb.removeJobInfo({
            _id: id
        }, removeJobCb);
    }

    function removeJobCb() {
        res.json({
            state: true,
            info: "删除成功"
        })
    }
};
module.exports = {
    show,
    addJob,
    jobList,
    modify,
    removeInfo
};