app.directive('exchangeRate', function (rateFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/exchangeRate.html',
        scope: {

        },
        link: function (scope) {

            scope.exchangeRate = rateFactory.exchangeRate;

            scope.updateRate = function () {
                rateFactory.updateExchangeRate(scope.rate).then(function () {
                    scope.exchangeRate.setting_value = scope.rate;
                    scope.rate = null;
                });
            };
        }
    }
});