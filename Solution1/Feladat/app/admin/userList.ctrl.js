var app;
(function (app) {
    var UserListController = (function () {
        function UserListController(userService, $location, $scope, $modal) {
            var _this = this;
            this.userService = userService;
            this.$location = $location;
            this.$scope = $scope;
            this.$modal = $modal;
            this.userService.searchDto = new app.UserSearchDto();
            this.userList = [];
            this.userService.fillUserList().then(function () {
                _this.search();
            });
        }
        UserListController.prototype.search = function () {
            this.userList = this.userService.getUserListBySearchDto();
            this.$scope.$broadcast("searched");
        };
        UserListController.prototype.searchBySearchText = function () {
            this.userService.searchDto.pagerConfig.pageIndex = 0;
            this.search();
        };
        UserListController.prototype.clearSearch = function () {
            this.userService.searchDto.searchText = "";
            this.searchBySearchText();
        };
        UserListController.prototype.order = function (orderBy) {
            if (this.userService.searchDto.orderBy === orderBy) {
                this.userService.searchDto.orderDirection = !this.userService.searchDto.orderDirection;
            }
            else {
                this.userService.searchDto.orderBy = orderBy;
                this.userService.searchDto.orderDirection = true;
            }
            this.search();
        };
        UserListController.prototype.editUser = function (user) {
            this.$location.path("/Users/" + user.id);
        };
        UserListController.prototype.keyPressed = function ($event) {
            if ($event.keyCode === 13) {
                this.searchBySearchText();
            }
        };
        UserListController.prototype.selectUser = function (user) {
            user.isSelected = !user.isSelected;
        };
        UserListController.prototype.openModal = function () {
            var _this = this;
            this.$modal.open({
                templateUrl: "app/admin/modal.html",
                resolve: {
                    selectedList: function () {
                        return _this.userList.filter(function (item) {
                            return item.isSelected;
                        });
                    }
                },
                controller: app.ModalController,
                controllerAs: "$ctrl"
            }).result;
        };
        return UserListController;
    }());
    UserListController.$inject = ["UserService", "$location", "$scope", "$uibModal"];
    app.UserListController = UserListController;
})(app || (app = {}));
//# sourceMappingURL=userList.ctrl.js.map