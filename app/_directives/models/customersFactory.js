app.factory('customersFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.customers = [];

    const getCustomers = function () {
        return $http.get(`${url}/getCustomers`).then(function (response) {
            angular.copy(response.data, model.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getCustomers = getCustomers();

    model.fetchCustomers = function () {
        return $http.get(`${url}/getCustomers`).then(function (response) {
            angular.copy(response.data, model.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.addCustomer = function (data) {
        return $http.post(`${url}/addCustomer`, data).then(response => {
            model.customers.push(response.data);
            $('#customerModal').modal('hide');
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        })
    };

    model.editCustomer = function (data) {
        return $http.post(`${url}/editCustomer`, data).then(response => {
            $('#customerModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    model.deleteCustomer = function (data) {
        return $http.post(`${url}/deleteCustomer`, data).then(res => {
            const index = model.customers.findIndex((cus => cus.customer_ID == res.data.customer_ID));
            model.customers.splice(index, 1);
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    return model;
});