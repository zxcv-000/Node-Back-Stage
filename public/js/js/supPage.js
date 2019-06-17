function SupPage() {
    this.liDom = $(".tabbar>ul>li");
    this.main = $("#main");
    this.init();
}

SupPage.prototype = {

    init() {
        this.liDomClick();

    },

    liDomClick() {
        this.liDom.on("click", this.liDomClickCb.bind(this));
    },

    liDomClickCb(e) {
        let index = $(e.target).index();

        $(".active").removeClass("active");
        $(e.target).addClass("active");



        switch (index) {

            case 0:
                new Show(this.main);
                break;
            case 1:
                new JobList(this.main);
                break;
            case 2:
                new AddJob(this.main);
                break;
        }
    }
}

new SupPage();