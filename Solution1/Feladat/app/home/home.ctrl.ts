module app {
    export class HomeController {
        static $inject = [];

        hello: string;

        constructor() {
            this.hello = "Szevasz Párizs";
        }
    }
}