﻿module app {
    angular.module("app", ["ngRoute"]);

    var initInjector = angular.injector(["ng"]);
    const $http = initInjector.get("$http");

    angular.module("app")
        .service("UserService", UserService)
        .directive("headerDirective", headerDirective)
        .directive("menuDirective", menuDirective)
        .directive("pagerDirective", pagerDirective);

    angular.module("app").config(['$routeProvider', ($routeProvider) => {
        $routeProvider
            .when("/Users", {
                templateUrl: "app/admin/userList.html",
                controller: UserListController,
                controllerAs: "uCtrl"
            })
            .when("/Users/:id", {
                templateUrl: "app/admin/user.html",
                controller: EditUserCtrl,
                controllerAs: "editUCtrl"
            })
            .otherwise("/Home", {
                templateUrl: "app/home/home.html",
                controller: HomeController,
                controllerAs: "homeCtrl"
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