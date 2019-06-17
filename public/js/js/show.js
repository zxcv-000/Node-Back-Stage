function Show(container){
    this.container = container;
    this.init();
}

Show.prototype ={

    init(){
        this.createShow();
    },

    createShow(){
        this.container.html("<h1>首页</h1>")
    }

}
