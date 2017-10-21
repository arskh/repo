module app {
    export class Controller1 {
        hello: string;
        menuVisible: boolean;

        static $inject = [];

        constructor(

        ) {
            this.hello = "Hello szia szevasz működök bazze";
            this.menuVisible = false;
        }

        menuClicked() {
            this.menuVisible = !this.menuVisible;
        }
    }
}