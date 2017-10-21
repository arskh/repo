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
        }

        fillUserList(): ng.IPromise<any> {
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
    }
}