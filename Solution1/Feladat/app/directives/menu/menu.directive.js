var app;
(function (app) {
    function menuDirective() {
        return {
            templateUrl: "app/directives/menu/menu.html",
            controller: app.MenuDirectiveController,
            controllerAs: "menuCtrl",
            replace: true,
            scope: {
                menuVisible: "="
            },
            bindToController: true
        };
    }
    app.menuDirective = menuDirective;
})(app || (app = {}));
//# sourceMappingURL=menu.directive.js.map