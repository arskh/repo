module app {
    export class HeaderDirectiveController {
        static $inject = ["user"];

        constructor(
            private user: UserDto
        ) {
        }
    }
}