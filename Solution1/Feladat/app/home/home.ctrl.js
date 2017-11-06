var app;
(function (app) {
    var HomeController = (function () {
        function HomeController() {
            this.hello = "Üdvözöllek az oldalon!";
        }
        return HomeController;
    }());
    app.HomeController = HomeController;
})(app || (app = {}));
//# sourceMappingURL=home.ctrl.js.map