module app {
    angular.module("app", ["ngRoute"]);

    var initInjector = angular.injector(["ng"]);
    const $http = initInjector.get("$http");

    angular.module("app")
        .directive("headerDirective", headerDirective)
        .directive("menuDirective", menuDirective)
        .controller("MainController", MainController)
        .controller("Controller2", Controller2)
        .controller("HomeController", HomeController);

    angular.module("app").config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when("/Book/:bookId", {
                templateUrl: "../views/book.html",
                controller: Controller2,
                controllerAs: "ctrl"
            })
            .when("/Home", {
                templateUrl: "../views/home.html",
                controller: HomeController,
                controllerAs: "ctrl"
            })
    }])

    $http.get("../data/user.json").then((response: ng.IHttpResponse<ResponseDataType<UserDto>>) => {
        angular.module("app").constant("user", response.data.data);
    }).then(() => {

        angular.element(document).ready(function () {
            angular.bootstrap(document, ["app"]);
        });
    });
}