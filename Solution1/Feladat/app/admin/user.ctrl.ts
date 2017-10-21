module app {
    interface IDictionary {
        [key: string]: string;
    }

    export class EditUserCtrl {
        id: number;
        user: UserDto;
        countries: Array<CountryDto>;
        errors: Object;
        emailRegexp: RegExp;

        static $inject = ["UserService", "$routeParams", "$http", "$location"];

        constructor(
            private userService: UserService,
            private $routeParams: IDictionary,
            private $http: ng.IHttpService,
            private $location: ng.ILocationService
        ) {
            this.id = parseInt(this.$routeParams["id"]);
            this.user = this.id === 0 ? new UserDto() : this.userService.getUserById(this.id);

            this.errors = {};
            this.emailRegexp = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");

            this.$http.get("../data/countries.json").then((response: ng.IHttpResponse<Array<CountryDto>>) => {
                this.countries = response.data.map((item: CountryDto) => {
                    return new CountryDto(item);
                });
            });

            this.userService.fillUserList();
        }

        save() {
            if (!this.isValid()) return;

            this.userService.saveUser(this.user);

            this.$location.path("/Users");
        }

        isValid() {
            this.errors = {};

            if (!this.user.userName) {
                this.errors["userName"] = "A felhasználónév kitöltése kötelező!";
            }
            if (!this.user.email) {
                this.errors["email"] = "Az e-mail cím kitöltése kötelező!";
            }
            if (!this.emailRegexp.test(this.user.email)) {
                this.errors["email"] = "Az e-mail cím formátuma nem megfelelő!";
            }
            if (!this.user.countryId) {
                this.errors["country"] = "Az ország kitöltése kötelező!";
            }
            if (!this.user.description) {
                this.errors["description"] = "A bemutatkozás kitöltése kötelező!";
            }
            if (!this.user.picturePath) {
                this.errors["picture"] = "Profilkép feltöltése kötelező!";
            }

            return JSON.stringify(this.errors) === JSON.stringify({});
        }

        setFile(element) {
            this.user.picturePath = element.files[0].name;
        }
    }
}