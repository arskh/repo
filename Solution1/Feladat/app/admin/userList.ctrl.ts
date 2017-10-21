module app {
    export class UserListController {
        userList: Array<UserDto>;

        static $inject = ["UserService"];

        constructor(
            private userService: UserService
        ) {
            this.userService.searchDto = new UserSearchDto();
            this.userList = [];

            this.userService.fillUserList().then(() => {
                this.userList = this.userService.getUserListBySearchDto();
            });
        }

        search() {
            this.userList = this.userService.getUserListBySearchDto();
            var asd = "qwe";
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
    }
}