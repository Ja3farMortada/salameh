app.directive('stockSettings', function (stockModel) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/stockSettings.html',
        scope: {

        },
        link: function (scope) {

            scope.exchangeRate = stockModel.exchangeRate;

            scope.updateRate = function () {
                stockModel.updateExchangeRate(scope.rate).then(function () {
                    scope.exchangeRate.exchange_rate = scope.rate;
                    scope.rate = null;
                });
            };
        }
    }
});