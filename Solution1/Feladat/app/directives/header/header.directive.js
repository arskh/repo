var app;
(function (app) {
    function headerDirective() {
        return {
            replace: true,
            templateUrl: "app/directives/header/header.html",
            controller: app.HeaderDirectiveController,
            controllerAs: "headerCtrl"
        };
    }
    app.headerDirective = headerDirective;
})(app || (app = {}));
//# sourceMappingURL=header.directive.js.map