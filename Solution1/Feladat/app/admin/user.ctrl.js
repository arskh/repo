var app;
(function (app) {
    var EditUserCtrl = (function () {
        function EditUserCtrl(userService, $routeParams, $http, $location) {
            var _this = this;
            this.userService = userService;
            this.$routeParams = $routeParams;
            this.$http = $http;
            this.$location = $location;
            this.id = parseInt(this.$routeParams["id"]);
            this.user = this.id === 0 ? new app.UserDto() : this.userService.getUserById(this.id);
            this.errors = {};
            this.emailRegexp = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
            this.$http.get("../data/countries.json").then(function (response) {
                _this.countries = response.data.map(function (item) {
                    return new app.CountryDto(item);
                });
            });
            this.userService.fillUserList();
        }
        EditUserCtrl.prototype.save = function () {
            if (!this.isValid())
                return;
            this.userService.saveUser(this.user);
            this.$location.path("/Users");
        };
        EditUserCtrl.prototype.isValid = function () {
            this.errors = {};
            if (!this.user.userName) {
                this.errors["userName"] = "A felhasználónév kitöltése kötelező!";
            }
            if (!this.user.email) {
                this.errors["email"] = "Az e-mail cím kitöltése kötelező!";
            }
            if (!this.emailRegexp.test(this.user.email)) {
                this.errors["email"] = "Az e-mail cím formátuma nem megfelelő!";
            }
            if (!this.user.countryId) {
                this.errors["country"] = "Az ország kitöltése kötelező!";
            }
            if (!this.user.description) {
                this.errors["description"] = "A bemutatkozás kitöltése kötelező!";
            }
            if (!this.user.picturePath) {
                this.errors["picture"] = "Profilkép feltöltése kötelező!";
            }
            return JSON.stringify(this.errors) === JSON.stringify({});
        };
        EditUserCtrl.prototype.setFile = function (element) {
            this.user.picturePath = element.files[0].name;
        };
        return EditUserCtrl;
    }());
    EditUserCtrl.$inject = ["UserService", "$routeParams", "$http", "$location"];
    app.EditUserCtrl = EditUserCtrl;
})(app || (app = {}));
//# sourceMappingURL=user.ctrl.js.map