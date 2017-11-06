var app;
(function (app) {
    function pagerDirective() {
        return {
            templateUrl: "app/directives/pager/pager.directive.html",
            scope: {
                searchFunction: "&"
            },
            controller: app.PagerDirectiveController,
            controllerAs: "pagerCtrl",
            bindToController: true
        };
    }
    app.pagerDirective = pagerDirective;
})(app || (app = {}));
//# sourceMappingURL=pager.directive.js.map