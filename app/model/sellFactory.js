app.factory('sellFactory', function ($http, NotificationService, rateFactory, sayrafaFactory, mainFactory) {

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
        return $http.post(`${url}/checkout`, {
            items: data,
            invoice: invoice
        }).then(response => {
            NotificationService.showSuccess();
            // if (type == 'takeaway') {
            //     $http.post(`${url}/thermalPrint`, response.data).then(response => {
            //         // console.log(response);
            //     }, error => {
            //         console.log(error);
            //         NotificationService.showErrorText('Printer is offline');
            //     })
            // }
            return 'success'
        }, error => {
            NotificationService.showErrorText(error);
        })
    }

    // clear invoice
    model.clearInvoice = function () {
        model.invoice.next([])
        model.selectedTab.next(null)
    };


    return model;
});