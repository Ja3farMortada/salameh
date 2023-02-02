app.factory('historyFactory', function($http, NotificationService, DateService) {

    // define url
    const url = `http://localhost:3000`;

    var model = {};
    model.datePickerValue = DateService.getDate();
    model.salesInvoices = [];
    model.paymentsHistory = [];
    model.totalSales = [];
    model.selectedTab = 'sales';

    model.setTab = tab => {
        model.selectedTab = tab;
    }

    // get and cache invoices 
    const getSalesInvoices = () => {
        $http.get(`${url}/getSalesInvoices/${model.datePickerValue}`).then(response => {
            angular.copy(response.data, model.salesInvoices);
        }, error => {
            NotificationService.showError(error);
        });
    };
    getSalesInvoices();

    // fetch invoices
    model.fetchSalesInvoices = date => {
        $http.get(`${url}/getSalesInvoices/${date}`).then(response => {
            angular.copy(response.data, model.salesInvoices);
        }, error => {
            NotificationService.showError(error);
        });
    };

    // get payments
    const getPaymentsHistory = () => {
        $http.get(`${url}/getPaymentsHistory/${model.datePickerValue}`).then(response => {
            angular.copy(response.data, model.paymentsHistory)
        }, error => {
            NotificationService.showError(error);
        })
    }
    getPaymentsHistory();

    model.fetchPaymentsHistory = date => {
        $http.get(`${url}/getPaymentsHistory/${date}`).then(response => {
            angular.copy(response.data, model.paymentsHistory)
        }, error => {
            NotificationService.showError(error);
        })
    }

    // delete invoice
    model.deleteInvoice = invoice => {
        return NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                return $http.post(`${url}/deleteInvoice`, {data: invoice}).then(() => {
                    NotificationService.showSuccess();
                    model.fetchSalesInvoices(model.datePickerValue);
                }, error => {
                    NotificationService.showError(error);
                })
            }
        })
    }

    return model;
})