module app {
    export class UserListController {
        userList: Array<UserDto>;

        static $inject = ["UserService", "$location", "$scope", "$uibModal"];

        constructor(
            private userService: UserService,
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private $modal: angular.ui.bootstrap.IModalService
        ) {
            this.userService.searchDto = new UserSearchDto();
            this.userList = [];

            this.userService.fillUserList().then(() => {
                this.search();
            });
        }

        search() {
            this.userList = this.userService.getUserListBySearchDto();
            this.$scope.$broadcast("searched");
        }

        searchBySearchText() {
            this.userService.searchDto.pagerConfig.pageIndex = 0;
            this.search();
        }

        clearSearch() {
            this.userService.searchDto.searchText = "";
            this.searchBySearchText();
        }

        order(orderBy: string) {
            if (this.userService.searchDto.orderBy === orderBy) {
                this.userService.searchDto.orderDirection = !this.userService.searchDto.orderDirection;
            } else {
                this.userService.searchDto.orderBy = orderBy;
                this.userService.searchDto.orderDirection = true;
            }

            this.search();
        }

        editUser(user: UserDto) {
            this.$location.path("/Users/" + user.id);
        }

        keyPressed($event: any) {
            if ($event.keyCode === 13) {
                this.searchBySearchText();
            }
        }

        selectUser(user: UserDto) {
            user.isSelected = !user.isSelected;
        }

        openModal() {
            this.$modal.open({
                templateUrl: "app/admin/modal.html",
                resolve: {
                    selectedList: () => {
                        return this.userList.filter((item: UserDto) => {
                            return item.isSelected;
                        });
                    }
                },
                controller: ModalController,
                controllerAs: "$ctrl"
            } as angular.ui.bootstrap.IModalSettings).result;
        }
    }
}