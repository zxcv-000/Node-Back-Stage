function JobList(container) {
    this.container = container;
    this.init();
}


JobList.prototype = {
    init() {
        this.creatJobList();
        this.bindEvents();
    },

    creatJobList() {

        $.ajax({
            type: "post",
            url: "/backstage/jobList",
            data: {},
            success: this.ajaxCb.bind(this)
        })
    },

    ajaxCb(data) {
        if (!data.state) {
            alert(data.info);
            location.href = "http://localhost:3000/index.html";
        } else {
            this.render.call(this, data.data);
        }
    },

    render(arr) {
        str = "";
        arr.forEach((item, i) => {
            str +=
                `<div class="list_job">
            <div class="job_des">
                 <div class="job_name">${arr[i].jobName}</div>
                 <div class="job_price">${arr[i].jobPrice}</div>
                 <div class="job_ex">${arr[i].jobAsk}</div>
            </div>
            <div class="com_des">
                <div class="company_logo">
                    <img src="${arr[i].jobLogo}"/>
                </div>
                <div class="company_name">${arr[i].companyName}</div>
            </div>
            <div class="operation" data-id="${arr[i]._id}">
                <button class="btn btn-danger job_delete">删除</button>
                <button class="btn btn-info job_model" data-toggle="modal" data-target="#jobModel">修改</button>
            </div>
         </div>`
        });
        this.container.html(str);
        $(".job_model").on("click", this.modifyCb.bind(this));
        $(".job_delete").on("click", this.removeCb.bind(this));
    },
    bindEvents() {
        // $("#modify_btn").on("click", this.modifySubmitCb.bind(this));
        $("#modify_btn")[0].onclick = this.modifySubmitCb.bind(this);
    },
    modifyCb(e) {
        var id = $(e.target).parent().attr("data-id");
        var parentNode = $(e.target).parent().parent();

        var jobName = parentNode.find(".job_name").text();
        var jobPrice = parentNode.find(".job_price").text();
        var jobAsk = parentNode.find(".job_ex").text();
        var companyName = parentNode.find(".company_name").text();

        let {
            jobName: jobName_M,
            jobPrice: jobPrice_M,
            jobAsk: jobAsk_M,
            companyName: companyName_M,
            modifyJob: modifyJob_M
        } = getDom();

        jobName_M.val(jobName);
        jobPrice_M.val(jobPrice);
        jobAsk_M.val(jobAsk);
        companyName_M.val(companyName);
        modifyJob_M.attr("data-id", id);
    },
    modifySubmitCb(e) {
        const {
            jobName,
            jobPrice,
            jobAsk,
            companyName,
            jobLogo,
            modifyJob
        } = getDom();
        //ajax模拟form表单
        console.log('aaa')
        let info = {
            "jobName": jobName.val(),
            "jobPrice": Number(jobPrice.val()),
            "jobAsk": jobAsk.val(),
            "companyName": companyName.val(),
            "jobLogo": jobLogo[0].files[0],
            "id": modifyJob.attr("data-id")
        };
        let ajaxDeploy = {
            type: 'post',
            url: "/backstage/jobList/modify",
            success: this.modifyAjaxCb.bind(this)
        };
        ajax_form(info, ajaxDeploy);
    },
    modifyAjaxCb(data) {
        alert(data.info);
        if (!data.state) {
            location.href = "http://localhost:3000/index.html";
        } else {
            this.creatJobList();
        }
    },
    removeCb(e) {

        var id = $(e.target).parent().attr("data-id");
        $.ajax({
            type: "get",
            url: "/backstage/jobList/remove",
            data: {
                id
            },
            success: this.removeAjaxCb.bind(this)
        })
    },
    removeAjaxCb(data) {
        alert(data.info);
        if (!data.state) {
            location.href = "http://localhost:3000/index.html";
        } else {
            this.creatJobList();
        }
    }
};