function AddJob(container) {
    this.container = container;

    this.init();
}

AddJob.template = `
<div class="addJob-body">
        <div id="addForm">
            <div class="form-group">
                <label for="job_addJob_name">职位名称</label>
                <input type="text" class="form-control" id="job_addJob_name" placeholder="请输入职位名称">
            </div>
            <div class="form-group">
                <label for="job_addJob_price">薪资</label>
                <input type="text" class="form-control" id="job_addJob_price" placeholder="薪资范围">
            </div>
            <div class="form-group">
                <label for="job_addJob_ask">要求</label>
                <input type="text" class="form-control" id="job_addJob_ask" placeholder="招聘要求">
            </div>
            <div class="form-group">
                <label for="company_addJob_name">公司名称</label>
                <input type="text" class="form-control" id="company_addJob_name" placeholder="请输入公司名称">
            </div>
            <div class="form-group">
                <label for="logo_addJob">上传公司logo</label>
                <input type="file" id="logo_addJob" multiple>
            </div>
            <div id = "sub" class="btn btn-primary">添加职位</div>
        </div>
</div>
`;

AddJob.prototype = {

    init() {

        this.createAddList();
        this.add();

    },

    createAddList() {
        this.container.html(AddJob.template);

    },

    add() {
        $("#sub").on("click", this.addCb.bind(this));
    },

    addCb(e) {

        var jobName = this.container.find("#job_addJob_name");
        var jobPrice = this.container.find("#job_addJob_price");
        var jobAsk = this.container.find("#job_addJob_ask");
        var companyName = this.container.find("#company_addJob_name");
        var jobLogo = this.container.find("#logo_addJob");

        //ajax模拟form表单
        let info = {
            "jobName": jobName.val(),
            "jobPrice": Number(jobPrice.val()),
            "jobAsk": jobAsk.val(),
            "companyName": companyName.val(),
            "jobLogo": jobLogo[0].files[0]
        };
        let ajaxDeploy = {
            type: "post",
            url: "/backstage/addJob",
            success: this.ajaxCb.bind(this)
        };
        ajax_form(info, ajaxDeploy);
    },

    ajaxCb(data) {
        alert(data.info);
        if (data.state) {
            $("input").val("");
        } else {
            location.href = "http://localhost:3000/index.html";
        }
    }
};