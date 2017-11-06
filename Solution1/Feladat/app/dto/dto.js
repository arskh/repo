var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var app;
(function (app) {
    var MenuDto = (function () {
        function MenuDto(data) {
            data = data || {};
            this.url = data.url || "";
            this.name = data.name || "";
            this.iconClass = data.iconClass || "";
            this.isActive = angular.isDefined(data.isActive) ? data.isActive : false;
        }
        return MenuDto;
    }());
    app.MenuDto = MenuDto;
    var MenuGroupDto = (function (_super) {
        __extends(MenuGroupDto, _super);
        function MenuGroupDto(data) {
            var _this = this;
            data = data || {};
            _this = _super.call(this, data) || this;
            _this.items = angular.isDefined(data.items) ? data.items.map(function (item) {
                return new MenuDto(item);
            }) : [];
            return _this;
        }
        return MenuGroupDto;
    }(MenuDto));
    app.MenuGroupDto = MenuGroupDto;
    var UserDto = (function () {
        function UserDto(data) {
            data = data || {};
            this.userName = data.userName || "";
            this.picturePath = data.picturePath || "";
            this.id = data.id || null;
            this.email = data.email || "";
            this.countryId = data.countryId || null;
            this.description = data.description || "";
            this.iconClass = data.iconClass || "";
            this.isSelected = angular.isDefined(data.isSelected) ? data.isSelected : false;
        }
        return UserDto;
    }());
    app.UserDto = UserDto;
    var PagerConfigDto = (function () {
        function PagerConfigDto(d) {
            d = d || {};
            this.pageSize = d.pageSize || 25;
            this.pageIndex = d.pageIndex || 0;
            this.totalItems = d.totalItems || 0;
        }
        return PagerConfigDto;
    }());
    app.PagerConfigDto = PagerConfigDto;
    var UserSearchDto = (function () {
        function UserSearchDto(d) {
            d = d || {};
            this.pagerConfig = d.pagerConfig || new PagerConfigDto();
            this.searchText = d.searchText || "";
            this.orderBy = d.orderBy || "";
            this.orderDirection = angular.isDefined(d.orderDirection) ? d.orderDirection : true;
            this.countryId = d.countryId || null;
        }
        return UserSearchDto;
    }());
    app.UserSearchDto = UserSearchDto;
    var CountryDto = (function () {
        function CountryDto(d) {
            d = d || {};
            this.name = d.name || "";
            this.id = d.id || null;
            this.className = d.className || "";
        }
        return CountryDto;
    }());
    app.CountryDto = CountryDto;
})(app || (app = {}));
//# sourceMappingURL=dto.js.map