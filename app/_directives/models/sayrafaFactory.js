app.factory('sayrafaFactory', function ($http, NotificationService) {
    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.sayrafaRate = new BehaviorSubject({});


    const getSayrafaRate = function () {
        $http.get(`${url}/getSayrafaRate`).then(function (response) {
            model.sayrafaRate.next(response.data)
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getSayrafaRate();

    model.updateSayrafaRate = data => {
        $http.post(`${url}/updateSayrafaRate`, data).then(response => {
            model.sayrafaRate.next(response.data)
            NotificationService.showSuccess();
        }, error => {
            NotificationService.showError(error);
        });
    };

    return model;
});