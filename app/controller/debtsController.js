app.controller('debtsController', function ($scope, debtsFactory, customersFactory, rateFactory, sayrafaFactory) {

    let rateSubscription;
    let sayrafaSubscription;
    $scope.$on('$viewContentLoaded', () => {
        rateSubscription = rateFactory.exchangeRate.subscribe(res => {
            $scope.exchangeRate = res;
        })
        sayrafaSubscription = sayrafaFactory.sayrafaRate.subscribe(res => {
            $scope.sayrafaRate = res;
        })

        $scope.customers = customersFactory.customers;
        $scope.selectedCustomer = debtsFactory.selectedCustomer;
        $scope.selectedCustomerHistory = debtsFactory.selectedCustomerHistory;
        $scope.searchCustomer = debtsFactory.searchCustomer;

        $('#searchCustomer').trigger('select');
    })

    // on destroy controller
    $scope.$on('$destroy', () => {
        rateSubscription.unsubscribe();
        sayrafaSubscription.unsubscribe();
    })


    $scope.getCustomerHistory = data => {
        debtsFactory.getCustomerHistory(data).then(() => {
            $scope.selectedCustomer = debtsFactory.selectedCustomer;
        })
    }

    $scope.searchVal = {
        date: ''
    };


    // define datepicker for filtering
    function datepicker() {
        $('#transactionsDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#transactionsDatepicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                // debtsFactory.datePickerValue = d;
                $scope.$digest($scope.searchVal.date = d);
            }
        }).datepicker("setDate", $scope.searchVal.date);
    };
    datepicker();

    // open payment modal
    const paymentModal = new bootstrap.Modal('#paymentModal');
    let modalType;
    $scope.openPaymentModal = (type, data) => {
        if (type == 'add') {
            modalType = 'add';
            $scope.modalData = {
                customer_ID_FK: $scope.selectedCustomer.customer_ID,
                payment_account: null,
                payment_currency: false,
                payment_value: null,
                actual_payment_value: null,
                payment_notes: null,
                exchange_rate: $scope.exchangeRate.rate_value,
                sayrafa_rate: $scope.sayrafaRate.rate_value
            }
            paymentModal.show();
        } else {
            modalType = 'edit';
            $scope.modalData = {};
            angular.copy(data, $scope.modalData);
        }
    }

    $scope.submitPayment = () => {
        switch (modalType) {
            case 'add':
                debtsFactory.addPayment($scope.modalData).then(res => {
                    paymentModal.hide();
                })
                break;

            case 'edit':
                debtsFactory.editPayment($scope.modalData).then(res => {
                    paymentModal.hide();
                })
                break;
        }
    }

    $scope.sendWhatsapp = () => {
        let data = $scope.selectedCustomer;
        let nl = `%0A`;
        let text = `Dear Customer${nl}Please settle your debts${nl}Your current balance is:${nl}- Fresh USD: ${data.dollar_debt.toLocaleString()}$${nl}- Sayrafa: ${data.sayrafa_debt.toLocaleString()}$${nl}- LBP: ${data.lira_debt.toLocaleString()} L.L${nl}Salameh Cell`
        window.electron.send('send-whatsapp', [data.customer_phone, text])
    }
})