module app {
    export function menuDirective(): ng.IDirective {
        return {
            templateUrl: "app/directives/menu/menu.html",
            controller: MenuDirectiveController,
            controllerAs: "menuCtrl",
            replace: true,
            scope: {
                menuVisible: "="
            },
            bindToController: true
        } as ng.IDirective;
    }
}