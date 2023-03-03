app.directive('sayrafaRate', function (sayrafaFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/sayrafaRate.html',
        scope: {

        },
        link: function (scope) {

            sayrafaFactory.sayrafaRate.subscribe(res => {
                scope.sayrafaRate = res;
            })

            const rateModal = new bootstrap.Modal('#sayrafaModal');
            $('#sayrafaModal').on('shown.bs.modal', () => {
                $('#rateValue').trigger('focus')
            })

            scope.openRateModal = () => {
                scope.modalData = {}
                angular.copy(scope.sayrafaRate, scope.modalData);
                rateModal.show()
            }

            scope.submitRate = function () {
                sayrafaFactory.updateSayrafaRate(scope.modalData);
                rateModal.hide()
            };
        }
    }
});