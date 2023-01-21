app.factory('debtsFactory', function($http, NotificationService, customersFactory) {
    // define url
    const url = `http://localhost:3000`;

    var model = {};
    model.selectedCustomerHistory = [];
    model.selectedCustomer = {};
    model.activeRow = null;

    model.searchCustomer = {
        customer_name: ''
    }

    model.setActiveRow = ID => {
        model.activeRow = ID;
    }

    model.getCustomerHistory = customer => {
        return $http.get(`${url}/getCustomerHistory/${customer.customer_ID}`).then(response => {
            model.selectedCustomer = customer;
            angular.copy(response.data, model.selectedCustomerHistory);
            model.activeRow = customer.customer_ID;
            return;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // add payment
    model.addPayment = data => {
        return $http.post(`${url}/addPayment`, data).then(response => {
            let index = customersFactory.customers.findIndex(x => x.customer_ID == data.customer_ID_FK);
            customersFactory.customers[index] = response.data;
            // fetch customer history
            model.getCustomerHistory(response.data)
            NotificationService.showSuccess();
            return response.data;
        }, error => {
            console.log(error);
            NotificationService.showError(error);
        })
    }

    return model;
})