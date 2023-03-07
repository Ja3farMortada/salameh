app.factory('customersFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.customers = [];

    const getCustomers = () => {
        return $http.get(`${url}/getCustomers`).then(response => {
            angular.copy(response.data, model.customers);
        }, error => {
            NotificationService.showError(error);
        });
    };
    getCustomers();

    model.fetchCustomers = () => {
        return $http.get(`${url}/getCustomers`).then(response => {
            angular.copy(response.data, model.customers);
        }, error => {
            NotificationService.showError(error);
        });
    };

    model.addCustomer = data => {
        return $http.post(`${url}/addCustomer`, data).then(response => {
            model.customers.push(response.data);
            NotificationService.showSuccess();
            return response.data;
        }, function (err) {
            NotificationService.showError(err);
        })
    };

    model.updateCustomer = data => {
        return $http.post(`${url}/updateCustomer`, data).then(response => {
            let index = model.customers.findIndex(x => x.customer_ID == data.customer_ID);
            model.customers[index] = response.data;
            NotificationService.showSuccess();
            return response.data;
        }, error => {
            NotificationService.showError(error);
        });
    };

    // // delete customer
    model.deleteCustomer = data => {
        NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                $http.post(`${url}/deleteCustomer`, data).then(response => {
                    if (response.data == 'deleted') {
                        let index = model.customers.findIndex(x => x.customer_ID == data.customer_ID);
                        model.customers.splice(index, 1);
                        NotificationService.showSuccess();
                    }
                }, error => {
                    NotificationService.showError(error);
                })
            }
        })
    }

    return model;
});