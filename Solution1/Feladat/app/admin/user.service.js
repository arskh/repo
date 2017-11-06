var app;
(function (app) {
    var UserService = (function () {
        function UserService($http, $q, $filter) {
            this.$http = $http;
            this.$q = $q;
            this.$filter = $filter;
            this.searchDto = new app.UserSearchDto();
            this.userList = [];
            this.fillUserList().then(function () {
            });
        }
        UserService.prototype.fillUserList = function () {
            var _this = this;
            if (this.userList.length > 0) {
                this.searchDto.pagerConfig.totalItems = this.userList.length;
                return this.$q.when();
            }
            var defer = this.$q.defer();
            this.$http.get("../data/userList.json").then(function (response) {
                _this.userList = response.data.map(function (item) {
                    return new app.UserDto(item);
                });
                _this.searchDto.pagerConfig.totalItems = _this.userList.length;
                defer.resolve();
            });
            return defer.promise;
        };
        UserService.prototype.getUserListBySearchDto = function () {
            var filteredList = this.getPagedUserList(this.orderUserList());
            return filteredList;
        };
        UserService.prototype.filterUserList = function () {
            if (!this.searchDto.searchText) {
                this.searchDto.pagerConfig.totalItems = this.userList.length;
                return this.userList;
            }
            var filteredUserList = this.$filter("filter")(this.userList, this.searchDto.searchText);
            this.searchDto.pagerConfig.totalItems = filteredUserList.length;
            return filteredUserList;
        };
        UserService.prototype.orderUserList = function () {
            return this.$filter("orderBy")(this.filterUserList(), this.searchDto.orderBy, !this.searchDto.orderDirection);
        };
        UserService.prototype.getPagedUserList = function (orderedFilteredUserList) {
            var i = this.searchDto.pagerConfig.pageIndex * this.searchDto.pagerConfig.pageSize, userList = [];
            var length = (this.searchDto.pagerConfig.pageIndex + 1) * this.searchDto.pagerConfig.pageSize;
            for (i; i < length; i++) {
                if (i > orderedFilteredUserList.length - 1)
                    break;
                userList.push(orderedFilteredUserList[i]);
            }
            return userList;
        };
        UserService.prototype.getUserById = function (id) {
            var filteredList = this.userList.filter(function (item) {
                return item.id === id;
            });
            return filteredList[0];
        };
        UserService.prototype.saveUser = function (userDto) {
            if (userDto.id !== 0) {
                this.userList.forEach(function (item) {
                    if (item.id === userDto.id) {
                        item = new app.UserDto(userDto);
                    }
                });
            }
            else {
                var maxId = this.userList.reduce(function (previous, current) {
                    return previous < current.id ? current.id : previous;
                }, 0);
                userDto.id = maxId;
                this.userList.push(userDto);
            }
        };
        return UserService;
    }());
    UserService.$inject = ["$http", "$q", "$filter"];
    app.UserService = UserService;
})(app || (app = {}));
//# sourceMappingURL=user.service.js.map