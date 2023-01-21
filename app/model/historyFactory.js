app.factory('historyFactory', function($http, NotificationService, DateService) {

    // define url
    const url = `http://localhost:3000`;

    var model = {};
    model.datePickerValue = DateService.getDate();
    model.salesInvoices = [];
    model.totalSales = [];

    // get and cache invoices 
    const getSalesInvoices = () => {
        return $http.get(`${url}/getSalesInvoices`, {
            params: {
                "date": model.datePickerValue
            }
        }).then(function (response) {
            angular.copy(response.data, model.salesInvoices);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getSalesInvoices();

    // fetch invoices
    model.fetchSalesInvoices = date => {
        return $http.get(`${url}/getSalesInvoices`, {
            params: {
                "date": date
            }
        }).then(function (response) {
            angular.copy(response.data, model.salesInvoices);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

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