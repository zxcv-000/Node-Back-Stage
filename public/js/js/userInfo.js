function UserInfo() {
    this.userName = $("#username");
    this.logOut = $("#js_logout");
    this.init();
}

UserInfo.prototype = {

    init() {
        this.setUserName();
        this.logOutClick();
    },

    setUserName() {
        let state = Cookies.get("user");

        if (state) {
            this.userName.html(state);
        }
    },

    logOutClick() {
        this.logOut.on("click", this.logOutClickCb.bind(this));
    },

    logOutClickCb() {
        if (confirm("您确定要退出吗?")) {
            Cookies.remove("user");
            Cookies.remove("token");
            location.href = "http://localhost:3000/index.html";
        }
    }
}
 
new UserInfo();