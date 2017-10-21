module app {
    export class MenuDto {
        url: string;
        name: string;
        iconClass: string;
        isActive: boolean;

        constructor(data?: MenuDto) {
            data = data || {} as MenuDto;
            this.url = data.url || "";
            this.name = data.name || "";
            this.iconClass = data.iconClass || "";
            this.isActive = angular.isDefined(data.isActive) ? data.isActive : false;
        }
    }

    export class MenuGroupDto extends MenuDto {
        items: Array<MenuDto>;

        constructor(data?: MenuGroupDto) {
            data = data || {} as MenuGroupDto;
            super(data);

            this.items = angular.isDefined(data.items) ? data.items.map((item: MenuDto) => {
                return new MenuDto(item);
            }) : [];
        }
    }

    export class UserDto {
        userName: string;
        picturePath: string;
        id: number;
        email: string;
        countryId: number;
        description: string;

        iconClass: string;
        isSelected: boolean;

        constructor(data?: UserDto) {
            data = data || {} as UserDto;

            this.userName = data.userName || "";
            this.picturePath = data.picturePath || "";
            this.id = data.id || null;
            this.email = data.email || "";
            this.countryId = data.countryId || null;
            this.description = data.description || "";

            this.iconClass = data.iconClass || "";
            this.isSelected = angular.isDefined(data.isSelected) ? data.isSelected : false;
        }
    }

    export class PagerConfigDto {
        pageSize: number;
        pageIndex: number;
        totalItems: number;

        constructor(d?: PagerConfigDto) {
            d = d || {} as PagerConfigDto;

            this.pageSize = d.pageSize || 25;
            this.pageIndex = d.pageIndex || 0;
            this.totalItems = d.totalItems || 0;
        }
    }

    export class UserSearchDto {
        pagerConfig: PagerConfigDto;
        searchText: string;
        orderBy: string;
        orderDirection: boolean;
        countryId: number;

        constructor(d?: UserSearchDto) {
            d = d || {} as UserSearchDto;

            this.pagerConfig = d.pagerConfig || new PagerConfigDto();
            this.searchText = d.searchText || "";
            this.orderBy = d.orderBy || "";
            this.orderDirection = angular.isDefined(d.orderDirection) ? d.orderDirection : true;
            this.countryId = d.countryId || null;
        }
    }

    export interface ResponseDataType<T> {
        data: T;
    }

    export class CountryDto {
        name: string;
        id: number;
        className: string;

        constructor(d?: CountryDto) {
            d = d || {} as CountryDto;

            this.name = d.name || "";
            this.id = d.id || null;
            this.className = d.className || "";
        }
    }
}