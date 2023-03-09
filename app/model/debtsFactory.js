app.factory('debtsFactory', function ($http, NotificationService, customersFactory, historyFactory) {
    // define url
    const url = `http://localhost:3000`;

    var model = {};
    model.selectedCustomerHistory = [];
    model.selectedCustomer = {};

    model.searchCustomer = {
        customer_name: ''
    }

    model.getCustomerHistory = customer => {
        return $http.get(`${url}/getCustomerHistory/${customer.customer_ID}`).then(response => {
            model.selectedCustomer = customer;
            angular.copy(response.data, model.selectedCustomerHistory);
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
            model.getCustomerHistory(response.data);
            historyFactory.fetchPaymentsHistory(historyFactory.datePickerValue);
            NotificationService.showSuccess();
            let customer = response.data;
            let nl = `%0A`;
            let text = `A payment has been received of '${data.payment_account}' account${nl}- Payment Value: ${data.payment_value.toLocaleString()}${data.payment_account == 'lira' ? 'L.L' : '$'}${nl}${data.payment_value != data.actual_payment_value ? 'Paid as' : ''} ${data.payment_value != data.actual_payment_value ? data.actual_payment_value.toLocaleString() : ''}${data.payment_value != data.actual_payment_value && data.payment_currency == 'lira' ? 'L.L' : ''}${data.payment_value != data.actual_payment_value && data.payment_currency == 'dollar' ? '$' : ''}${nl}Your current balance is:${nl}- Fresh USD: ${customer.dollar_debt.toLocaleString()}$${nl}- Sayrafa: ${customer.sayrafa_debt.toLocaleString()}$${nl}- LBP: ${customer.lira_debt.toLocaleString()} L.L${nl}Salameh Cell`;
            console.log(text);
            window.electron.send('send-whatsapp', [customer.customer_phone, text])
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    return model;
})