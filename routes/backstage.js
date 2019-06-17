var express = require('express');
var multer = require("multer");
var backstage = require("../control/backstage");

var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage
});

var cpUpload = upload.fields([{
    name: "jobLogo",
    maxCount: 1
}]);

router.post('/', backstage.show);

router.post('/jobList', backstage.jobList);

router.get('/jobList/remove', backstage.removeInfo);

router.post('/jobList/modify', cpUpload, backstage.modify);

router.post('/addJob', cpUpload, backstage.addJob);


module.exports = router;