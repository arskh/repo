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
    }

    export interface ResponseDataType<T>{
        data: T;
    }
}