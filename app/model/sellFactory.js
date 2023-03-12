app.factory('sellFactory', function ($http, NotificationService, rateFactory, sayrafaFactory, mainFactory, customersFactory, debtsFactory) {

    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.selectedCategory = new BehaviorSubject({
        category_name: 'No Category Selected!'
    });
    model.invoice = new BehaviorSubject([]);
    model.invoicesOnHold = new BehaviorSubject([]);
    model.selectedTab = new BehaviorSubject();
    model.searchVal = new BehaviorSubject({
        category_ID_FK: null
    })
    rateFactory.exchangeRate.subscribe(res => {
        model.exchangeRate = res;
    });
    sayrafaFactory.sayrafaRate.subscribe(res => {
        model.sayrafaRate = res;
    })
    mainFactory.loggedInUser.subscribe(res => {
        model.loggedInUser = res;
    })


    // calculate total
    model.total = function () {
        let invoice
        this.invoice.subscribe(res => {
            invoice = res;
        })
        return invoice.reduce(function (memo, item) { // memo is the reduced value initialized by object of zero values
            return {
                totalCost: memo.totalCost + (item.qty * item.unit_cost),
                totalPrice: memo.totalPrice + (item.qty * item.unit_price)
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
    model.checkout = (data, type) => {
        let invoice = {
            user_ID_FK: JSON.parse(localStorage.getItem('setting')).user_ID,
            invoice_type: 'Sale',
            total_cost: model.total().totalCost,
            total_price: model.total().totalPrice,
            exchange_rate: model.exchangeRate.rate_value,
            sayrafa_rate: model.sayrafaRate.rate_value
        }
        console.log(invoice);
        return $http.post(`${url}/checkout`, {
            items: data,
            invoice: invoice
        }).then(response => {
            NotificationService.showSuccess();
            return 'success';
        }, error => {
            NotificationService.showErrorText(error);
        })
    }

    // checkout with debt
    model.checkoutDebt = (id, data, msg) => {
        let invoice = {
            user_ID_FK: model.loggedInUser.user_ID,
            customer_ID_FK: id,
            invoice_type: 'Debt',
            total_cost: model.total().totalCost,
            total_price: model.total().totalPrice,
            exchange_rate: model.exchangeRate.rate_value,
            sayrafa_rate: model.sayrafaRate.rate_value
        }
        return $http.post(`${url}/checkoutDebt`, {
            items: data,
            invoice: invoice
        }).then(async response => {
            model.clearInvoice();
            NotificationService.showSuccess();
            debtsFactory.getCustomerHistory(debtsFactory.selectedCustomer);
            // fetch customers to update debts
            await customersFactory.fetchCustomers();
            if (msg) {
                let index = customersFactory.customers.findIndex(x => x.customer_ID == id);
                let customer = customersFactory.customers[index]
                let nl = `%0A`;
                let itemsText = ``;
                data.forEach(element => {
                    itemsText += `- ${element.qty} * ${element.item_description} of total ${(element.qty * element.original_price).toLocaleString()}${element.currency == 'lira' ? 'L.L' : '$'} ${element.currency == 'sayrafa' ? 'on Sayrafa Rate' : ''} ${nl}`
                });
                let text = `New Invoice %23:${response.data}${nl}${itemsText}Your latest balance is:${nl}- Fresh USD: ${customer.dollar_debt.toLocaleString()}$${nl}- Sayrafa: ${customer.sayrafa_debt.toLocaleString()}$${nl}- LBP: ${customer.lira_debt.toLocaleString()} L.L${nl}Salameh Cell`;
                window.electron.send('send-whatsapp', [customer.customer_phone, text]);
            }
        }, error => {
            NotificationService.showError(error);
        })
    }

    // checkout without debt
    model.checkoutCustomer = (id, data) => {
        let invoice = {
            user_ID_FK: model.loggedInUser.user_ID,
            customer_ID_FK: id,
            invoice_type: 'Sale',
            total_cost: model.total().totalCost,
            total_price: model.total().totalPrice,
            exchange_rate: model.exchangeRate.setting_value,
            sayrafa_rate: model.sayrafaRate.rate_value
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
        model.invoice.next([])
        model.selectedTab.next(null)
    };


    return model;
});