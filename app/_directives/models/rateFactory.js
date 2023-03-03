app.factory('rateFactory', function ($http, NotificationService) {
    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.exchangeRate = new BehaviorSubject({});


    const getExchangeRate = function () {
        $http.get(`${url}/getExchangeRate`).then(function (response) {
            model.exchangeRate.next(response.data)
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getExchangeRate();

    model.updateExchangeRate = data => {
        $http.post(`${url}/updateExchangeRate`, data).then(response => {
            model.exchangeRate.next(response.data)
            NotificationService.showSuccess();
        }, error => {
            NotificationService.showError(error);
        });
    };

    return model;
});