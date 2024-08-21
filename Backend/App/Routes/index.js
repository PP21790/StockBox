module.exports = function (app) {
    app.use(require("./Clients")),
    app.use(require("./BasicSetting")),
    app.use(require("./Blogs")),
    app.use(require("./News"))
    app.use(require("./Coupon"))
    app.use(require("./Role"))
    app.use(require("./Service"))
    app.use(require("./Users"))

}