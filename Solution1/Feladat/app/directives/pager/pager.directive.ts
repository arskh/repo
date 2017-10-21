module app {
    export function pagerDirective(): ng.IDirective {
        return {
            templateUrl: "app/directives/pager/pager.directive.html",
            scope: {
                searchFunction: "&"
            },
            controller: PagerDirectiveController,
            controllerAs: "pagerCtrl",
            bindToController: true
        } as ng.IDirective;
    }
}