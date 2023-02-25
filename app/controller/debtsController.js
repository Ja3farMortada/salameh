app.controller('debtsController', function ($scope, debtsFactory, customersFactory, rateFactory) {

    $scope.customers = customersFactory.customers;
    $scope.selectedCustomer = debtsFactory.selectedCustomer;
    $scope.selectedCustomerHistory = debtsFactory.selectedCustomerHistory;
    $scope.activeRow = debtsFactory.activeRow;
    $scope.searchCustomer = debtsFactory.searchCustomer;

    // trigger select for search input for better UX
    angular.element(document).ready(() => {
        $('#searchCustomer').trigger('select');
    })

    $scope.getCustomerHistory = data => {
        debtsFactory.getCustomerHistory(data).then(() => {
            $scope.selectedCustomer = debtsFactory.selectedCustomer;
            $scope.activeRow = data.customer_ID;
            debtsFactory.activeRow = data.customer_ID;
        })
    }

    $scope.searchVal = {
        date: ''
    };

    // set active td in customer's table
    $scope.isActive = ID => {
        return $scope.activeRow === ID;
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
                payment_value: null,
                other_currency: false,
                actual_payment_value: null,
                payment_notes: null,
                exchange_rate: rateFactory.exchangeRate.setting_value
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

    $scope.sendWhatsapp = data => {
        console.log(data);
        window.electron.send('send-whatsapp', data)
    }
})