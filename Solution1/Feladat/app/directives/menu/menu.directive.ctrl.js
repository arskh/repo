var app;
(function (app) {
    var MenuDirectiveController = (function () {
        function MenuDirectiveController($http) {
            var _this = this;
            this.$http = $http;
            this.menus = [];
            this.$http.get("../data/menu.json").then(function (data) {
                data.data.map(function (item) {
                    _this.menus.push(new app.MenuGroupDto(item));
                });
            });
        }
        MenuDirectiveController.prototype.menuItemClicked = function (menuItem) {
            this.menus.forEach(function (item) {
                if (item !== menuItem) {
                    item.isActive = false;
                }
                else {
                    item.isActive = !menuItem.isActive;
                }
            });
        };
        MenuDirectiveController.prototype.toggleMenu = function () {
            this.menuVisible.value = !this.menuVisible.value;
        };
        return MenuDirectiveController;
    }());
    MenuDirectiveController.$inject = ["$http"];
    app.MenuDirectiveController = MenuDirectiveController;
})(app || (app = {}));
//# sourceMappingURL=menu.directive.ctrl.js.map