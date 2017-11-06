var app;
(function (app) {
    var MainController = (function () {
        function MainController() {
            this.menu = { value: true };
        }
        return MainController;
    }());
    app.MainController = MainController;
    angular.module("app", ["ngRoute", "ui.bootstrap"]);
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    angular.module("app")
        .service("UserService", app.UserService)
        .directive("headerDirective", app.headerDirective)
        .directive("menuDirective", app.menuDirective)
        .directive("pagerDirective", app.pagerDirective)
        .directive("singleClickDirective", ['$parse', app.singleClickDirective])
        .controller("MainController", MainController);
    angular.module("app").config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when("/Users", {
                templateUrl: "app/admin/userList.html",
                controller: app.UserListController,
                controllerAs: "uCtrl"
            })
                .when("/Users/:id", {
                templateUrl: "app/admin/user.html",
                controller: app.EditUserCtrl,
                controllerAs: "editUCtrl"
            })
                .when("/Home", {
                templateUrl: "app/home/home.html",
                controller: app.HomeController,
                controllerAs: "homeCtrl"
            }).otherwise({
                redirectTo: '/Home'
            });
        }]);
    $http.get("../data/user.json").then(function (response) {
        angular.module("app").constant("user", response.data.data);
    }).then(function () {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ["app"]);
        });
    });
})(app || (app = {}));
//# sourceMappingURL=app.js.map