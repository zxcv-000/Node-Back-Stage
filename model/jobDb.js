const mongoose = require("../db/database").mongoose;

const JobInfo = mongoose.model("jobinfo", {
    jobName: String,
    jobPrice: Number,
    jobAsk: String,
    companyName: String,
    jobLogo: String
});


const findJobInfo = (jobInfoCb) => {
    JobInfo.find().then((result) => {
        jobInfoCb(result);
    })
};


const saveJobInfo = (info, jobInfoCb) => {
    const jobInfo = new JobInfo(info);
    jobInfo.save().then((result) => {
        jobInfoCb(result);
    })
};


const modifyJobInfo = (jobId, info, jobInfoCb) => {
    JobInfo.update(jobId, {$set: info}).then((result) => {
        jobInfoCb(result)
    });
}; 


const removeJobInfo = (info, jobInfoCb) => {
    JobInfo.remove(info).then((result) => {
        jobInfoCb(result)
    })
}


module.exports = {
    findJobInfo,
    saveJobInfo,
    modifyJobInfo,
    removeJobInfo
};