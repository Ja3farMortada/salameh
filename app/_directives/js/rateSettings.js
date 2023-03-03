app.directive('exchangeRate', function (rateFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/exchangeRate.html',
        scope: {

        },
        link: function (scope) {

            rateFactory.exchangeRate.subscribe(res => {
                scope.exchangeRate = res;
            })

            const rateModal = new bootstrap.Modal('#rateModal');
            $('#rateModal').on('shown.bs.modal', () => {
                $('#rateValue').trigger('focus')
            })

            scope.openRateModal = () => {
                scope.modalData = {}
                angular.copy(scope.exchangeRate, scope.modalData);
                console.log(scope.modalData);
                rateModal.show()
            }

            scope.submitRate = function () {
                rateFactory.updateExchangeRate(scope.modalData);
                rateModal.hide()
            };
        }
    }
});