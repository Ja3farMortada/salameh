app.factory('rateFactory', function ($http, NotificationService) {
    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.exchangeRate = {
        setting_value: 0
    };


    const getExchangeRate = function () {
        $http.get(`${url}/getExchangeRate`).then(function (response) {
            angular.copy(response.data, model.exchangeRate);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getExchangeRate();

    model.updateExchangeRate = data => {
        return $http.post(`${url}/updateExchangeRate`, {
            rate: data
        }).then(() => {
            NotificationService.showSuccess();
        }, error => {
            NotificationService.showError(error);
        });
    };

    return model;
});