module app {
    export class UserListController {
        userList: Array<UserDto>;

        static $inject = ["UserService", "$location"];

        constructor(
            private userService: UserService,
            private $location: ng.ILocationService
        ) {
            this.userService.searchDto = new UserSearchDto();
            this.userList = [];

            this.userService.fillUserList().then(() => {
                this.search();
            });
        }

        search() {
            this.userList = this.userService.getUserListBySearchDto();
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
    }
}