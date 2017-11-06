var app;
(function (app) {
    var ModalController = (function () {
        function ModalController(selectedList, $modalInstance) {
            this.selectedList = selectedList;
            this.$modalInstance = $modalInstance;
        }
        ModalController.prototype.ok = function () {
            this.$modalInstance.close();
        };
        ModalController.prototype.cancel = function () {
            this.$modalInstance.dismiss();
        };
        return ModalController;
    }());
    ModalController.$inject = ["selectedList", "$uibModalInstance"];
    app.ModalController = ModalController;
})(app || (app = {}));
//# sourceMappingURL=modal.ctrl.js.map