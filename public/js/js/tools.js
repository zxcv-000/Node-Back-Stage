function getDom() {
    let jobName = $("#job_modify_name");
    let jobPrice = $("#job_modify_price");
    let jobAsk = $("#job_modify_ask");
    let companyName = $("#company_modify_name");
    let jobLogo = $("#logo_modify");
    let modifyJob = $("#modifyJob");

    return {jobName, jobPrice, jobAsk, companyName, jobLogo, modifyJob}
}


function ajax_form(info,ajaxDeploy) {
    let formData = new FormData();
    for (let key in info) {
        formData.append(key, info[key]);
    }
    $.ajax({
        type: ajaxDeploy.type,
        url: ajaxDeploy.url,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: ajaxDeploy.success
    })
}

