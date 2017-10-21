module app {
    export class ModalController {
        static $inject = ["selectedList", "$uibModalInstance"];

        constructor(
            private selectedList: Array<UserDto>,
            private $modalInstance: ng.ui.bootstrap.IModalInstanceService
        ) {
            
        }

        ok() {
            this.$modalInstance.close();
        }

        cancel() {
            this.$modalInstance.dismiss();
        }
    }
}