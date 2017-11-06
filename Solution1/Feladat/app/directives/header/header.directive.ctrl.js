var app;
(function (app) {
    var HeaderDirectiveController = (function () {
        function HeaderDirectiveController(user) {
            this.user = user;
        }
        return HeaderDirectiveController;
    }());
    HeaderDirectiveController.$inject = ["user"];
    app.HeaderDirectiveController = HeaderDirectiveController;
})(app || (app = {}));
//# sourceMappingURL=header.directive.ctrl.js.map