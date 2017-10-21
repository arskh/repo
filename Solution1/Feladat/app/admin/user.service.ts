module app {
    export class UserService {
        userList: Array<UserDto>;
        searchDto: UserSearchDto;

        static $inject = ["$http", "$q", "$filter"];

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $filter: ng.IFilterService
        ) {
            this.searchDto = new UserSearchDto();
            this.userList = [];

            this.fillUserList().then(() => {
                
            });
        }

        fillUserList(): ng.IPromise<any> {
            if (this.userList.length > 0) {
                return this.$q.when();
            }

            var defer = this.$q.defer();
            
            this.$http.get("../data/userList.json").then((response: ng.IHttpResponse<Array<UserDto>>) => {
                this.userList = response.data.map((item: UserDto) => {
                    return new UserDto(item);
                });

                this.searchDto.pagerConfig.totalItems = this.userList.length;
                defer.resolve();
            });

            return defer.promise;
        }

        getUserListBySearchDto(): Array<UserDto> {
            let filteredUserList = JSON.parse(JSON.stringify(this.userList));
            filteredUserList = this.$filter("orderBy")(this.userList, this.searchDto.orderBy, !this.searchDto.orderDirection);
            
            let i = this.searchDto.pagerConfig.pageIndex * this.searchDto.pagerConfig.pageSize, userList: Array<UserDto> = [];
            const length = (this.searchDto.pagerConfig.pageIndex + 1) * this.searchDto.pagerConfig.pageSize;
            for (i; i < length; i++) {
                if (i > filteredUserList.length - 1) break;
                userList.push(filteredUserList[i]);
            }
            return userList;
        }

        getUserById(id: number): UserDto {
            let filteredList = this.userList.filter((item: UserDto) => {
                return item.id === id;
            });

            return filteredList[0];
        }

        saveUser(userDto: UserDto) {
            if (userDto.id !== 0) {
                this.userList.forEach((item: UserDto) => {
                    if (item.id === userDto.id) {
                        item = new UserDto(userDto);
                    }
                });
            } else {
                var maxId = this.userList.reduce((previous: number, current: UserDto) => {
                    return previous < current.id ? current.id : previous;
                }, 0);

                userDto.id = maxId;
                this.userList.push(userDto);
            }            
        }
    }
}