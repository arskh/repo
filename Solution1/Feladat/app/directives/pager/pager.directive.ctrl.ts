module app {
    export class PagerDirectiveController {
        searchFunction: Function;
        pagerConfig: PagerConfigDto;
        indexes: Array<number>;

        static $inject = ["UserService", "$scope"];

        constructor(
            private userService: UserService,
            private $scope: ng.IScope
        ) {
            this.pagerConfig = userService.searchDto.pagerConfig;
            this.fillIndexes();

            var searchedEvent = this.$scope.$on("searched", () => {
                this.fillIndexes();
            });

            this.$scope.$on("$destroy", () => {
                if (searchedEvent) {
                    searchedEvent();
                }
            });
        }

        fillIndexes() {
            this.indexes = [];

            let totalPages = Math.floor(this.pagerConfig.totalItems / this.pagerConfig.pageSize);
            if (this.pagerConfig.totalItems % this.pagerConfig.pageSize > 0) totalPages++;

            if (totalPages < 5) {
                let i = 0;
                for (i; i < totalPages; i++) {
                    this.indexes.push(i);
                }
                return;
            }

            if (this.pagerConfig.pageIndex < 2) {
                let i = 0;
                for (i; i < 5; i++) {
                    this.indexes.push(i);
                }
                return;
            }

            if (this.pagerConfig.pageIndex + 3 > totalPages) {
                let i = totalPages - 5;
                for (i; i < totalPages; i++) {
                    this.indexes.push(i);
                }
                return;
            }

            const length = this.pagerConfig.pageIndex + 3;
            let i = this.pagerConfig.pageIndex - 2;
            for (i; i < length; i++) {
                this.indexes.push(i);
            }
        }

        setPageIndex(index: number) {
            this.pagerConfig.pageIndex = index;
            this.fillIndexes();
            this.searchFunction();
        }

        previous() {
            if (this.pagerConfig.pageIndex === 0) return;
            this.pagerConfig.pageIndex--;
            this.fillIndexes();
            this.searchFunction();
        }

        next() {
            if (this.indexes[this.indexes.length - 1] < this.pagerConfig.pageIndex + 1) return;
            this.pagerConfig.pageIndex++;
            this.fillIndexes();
            this.searchFunction();
        }
    }
}