﻿module app {
    export function headerDirective(): ng.IDirective {
        return {
            replace: true,
            templateUrl: "app/directives/header/header.html",
            controller: HeaderDirectiveController
        } as ng.IDirective;
    }
}