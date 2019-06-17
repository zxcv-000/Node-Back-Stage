function Register(container) {
    this.container = container;
    this.init();
}

Register.template = `
<div class="sign-content">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form id="register-form">
                <div class="form-group">
                    <label for="sign-register-username">用户名</label>
                    <input type="text" class="form-control" id="sign-register-username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label for="sign-register-password">密码</label>
                    <input type="password" class="form-control" id="sign-register-password" placeholder="请输入密码">
                </div>
                <p class="bg-info" id="toggle">已注册,立即登录</p>
                <button type="submit" class="btn btn-primary sign-btn">注册</button>
            </form>
        </div> 
`
Register.prototype = {

    init: function () {
        this.create();
        this.registerClick();
        this.changeLogin();
    },

    create: function () {
        this.el = $("<div></div>");
        this.el.append(Register.template);
        this.container.append(this.el);
    },

    registerClick: function () {
        this.el.find("#register-form").on("submit", this.sendAjax.bind(this));
    },

    changeLogin: function () {
        $("#toggle").on("click", this.changeLoginCb.bind(this))
    },

    changeLoginCb: function () {
        this.container.html("");
        new Login(this.container);
    },

    sendAjax: function (e) {
        e.preventDefault();
        let userName = this.el.find("#sign-register-username").val();
        let passWord = this.el.find("#sign-register-password").val();

        $.ajax({
            type: "post",
            url: "/register",
            data: {
                userName,
                passWord
            },
            success: this.ajaxCb.bind(this)
        });
    },

    ajaxCb: function (data) {

        if (data.state) {
            alert(data.info);
            this.container.html("");
            new Login(this.container);
        } else {
            alert(data.info);
        }

    }
}