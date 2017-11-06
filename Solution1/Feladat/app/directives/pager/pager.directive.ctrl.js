var app;
(function (app) {
    var PagerDirectiveController = (function () {
        function PagerDirectiveController(userService, $scope) {
            var _this = this;
            this.userService = userService;
            this.$scope = $scope;
            this.pagerConfig = userService.searchDto.pagerConfig;
            this.fillIndexes();
            var searchedEvent = this.$scope.$on("searched", function () {
                _this.fillIndexes();
            });
            this.$scope.$on("$destroy", function () {
                if (searchedEvent) {
                    searchedEvent();
                }
            });
        }
        PagerDirectiveController.prototype.fillIndexes = function () {
            this.indexes = [];
            var totalPages = Math.floor(this.pagerConfig.totalItems / this.pagerConfig.pageSize);
            if (this.pagerConfig.totalItems % this.pagerConfig.pageSize > 0)
                totalPages++;
            if (totalPages < 5) {
                var i_1 = 0;
                for (i_1; i_1 < totalPages; i_1++) {
                    this.indexes.push(i_1);
                }
                return;
            }
            if (this.pagerConfig.pageIndex < 2) {
                var i_2 = 0;
                for (i_2; i_2 < 5; i_2++) {
                    this.indexes.push(i_2);
                }
                return;
            }
            if (this.pagerConfig.pageIndex + 3 > totalPages) {
                var i_3 = totalPages - 5;
                for (i_3; i_3 < totalPages; i_3++) {
                    this.indexes.push(i_3);
                }
                return;
            }
            var length = this.pagerConfig.pageIndex + 3;
            var i = this.pagerConfig.pageIndex - 2;
            for (i; i < length; i++) {
                this.indexes.push(i);
            }
        };
        PagerDirectiveController.prototype.setPageIndex = function (index) {
            this.pagerConfig.pageIndex = index;
            this.fillIndexes();
            this.searchFunction();
        };
        PagerDirectiveController.prototype.previous = function () {
            if (this.pagerConfig.pageIndex === 0)
                return;
            this.pagerConfig.pageIndex--;
            this.fillIndexes();
            this.searchFunction();
        };
        PagerDirectiveController.prototype.next = function () {
            if (this.indexes[this.indexes.length - 1] < this.pagerConfig.pageIndex + 1)
                return;
            this.pagerConfig.pageIndex++;
            this.fillIndexes();
            this.searchFunction();
        };
        return PagerDirectiveController;
    }());
    PagerDirectiveController.$inject = ["UserService", "$scope"];
    app.PagerDirectiveController = PagerDirectiveController;
})(app || (app = {}));
//# sourceMappingURL=pager.directive.ctrl.js.map