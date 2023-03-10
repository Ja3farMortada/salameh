app.factory('sellFactory', function ($http, NotificationService, rateFactory, mainFactory, customersFactory) {

    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.invoice = [];
    model.selectedCategory = 'Touch';
    model.exchangeRate = rateFactory.exchangeRate;

    model.searchVal = new BehaviorSubject({
        category_ID_FK: null
    })

    model.setCategory = category => {
        model.selectedCategory = category;
    }

    // calculate total
    model.total = function () {
        return this.invoice.reduce(function (memo, item) { // memo is the reduced value initialized by object of zero values
            return {
                totalCost: item.currency == 'lira' ? memo.totalCost + (item.qty * item.unit_cost) : memo.totalCost + (item.qty * item.unit_cost * model.exchangeRate.setting_value),
                totalPrice: item.currency == 'lira' ? memo.totalPrice + (item.qty * item.unit_price) : memo.totalPrice + (item.qty * item.unit_price * model.exchangeRate.setting_value)
            };
        }, {
            totalCost: 0,
            totalPrice: 0
        });
    };

    // get item with barcode
    model.submitBarcode = barcode => {
        return $http.post(`${url}/getBarcode`, {
            data: barcode
        }).then(response => {
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // checkout
    model.checkout = data => {
        let invoice = {
            user_ID_FK: mainFactory.loggedInUser.user_ID,
            invoice_type: 'Sale',
            total_cost: model.total().totalCost,
            total_price: model.total().totalPrice,
            exchange_rate: model.exchangeRate.setting_value
        }
        return $http.post(`${url}/checkout`, {
            items: data,
            invoice: invoice
        }).then(response => {
            model.clearInvoice();
            NotificationService.showSuccess();
            return response;
        }, error => {
            NotificationService.showErrorText(error);
        })
    }

    // checkout with debt
    model.checkoutDebt = (id, data) => {
        let invoice = {
            user_ID_FK: mainFactory.loggedInUser.user_ID,
            customer_ID_FK: id,
            invoice_type: 'Debt',
            total_cost: model.total().totalCost,
            total_price: model.total().totalPrice,
            exchange_rate: model.exchangeRate.setting_value
        }
        return $http.post(`${url}/checkoutDebt`, {
            items: data,
            invoice: invoice
        }).then(response => {
            model.clearInvoice();
            NotificationService.showSuccess();
            // fetch customers to update debts
            customersFactory.fetchCustomers();
            return response;
        }, error => {
            console.log(error);
            NotificationService.showError(error);
        })
    }

    // checkout with debt
    model.checkoutCustomer = (id, data) => {
        let invoice = {
            user_ID_FK: mainFactory.loggedInUser.user_ID,
            customer_ID_FK: id,
            invoice_type: 'Sale',
            total_cost: model.total().totalCost,
            total_price: model.total().totalPrice,
            exchange_rate: model.exchangeRate.setting_value
        }
        return $http.post(`${url}/checkoutCustomer`, {
            items: data,
            invoice: invoice
        }).then(response => {
            model.clearInvoice();
            NotificationService.showSuccess();
            // fetch customers to update debts
            customersFactory.fetchCustomers();
            return response;
        }, error => {
            console.log(error);
            NotificationService.showError(error);
        })
    }

    // clear invoice
    model.clearInvoice = function () {
        this.invoice = [];
    };


    return model;
});