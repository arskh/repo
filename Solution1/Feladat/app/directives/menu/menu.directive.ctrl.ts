module app {
    export class MenuDirectiveController {
        menus: Array<MenuGroupDto>;
        menuVisible: boolean;

        static $inject = ["$http"];

        constructor(
            private $http: ng.IHttpService
        ) {
            this.menus = [];
            this.menuVisible = false;

            this.$http.get("../data/menu.json").then((data: ng.IHttpResponse<Array<MenuGroupDto>>) => {
                data.data.map((item: MenuGroupDto) => {
                    this.menus.push(new MenuGroupDto(item));
                });
            });
        }

        menuItemClicked(menuItem: MenuDto) {
            this.menus.forEach((item: MenuGroupDto) => {
                if (item !== menuItem) {
                    item.isActive = false;
                } else {
                    item.isActive = !menuItem.isActive;
                }
            });
        }

        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        }
    }
}