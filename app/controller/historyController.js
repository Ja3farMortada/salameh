app.controller('historyController', function ($scope, historyFactory, rateFactory, DateService) {


    //tab selection
    $scope.selectedTab = historyFactory.selectedTab;
    $scope.setTab = tab => {
        historyFactory.setTab(tab);
        $scope.selectedTab = historyFactory.selectedTab;
    }

    // get logged in user type
    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // get exchange rate
    $scope.exchangeRate = rateFactory.exchangeRate;

    // bind invoices with model factory
    $scope.salesInvoices = historyFactory.salesInvoices;
    $scope.$watch('salesInvoices', function () {
        $scope.totalSales = historyFactory.totalSales()
    }, true)

    // payments
    $scope.paymentsHistory = historyFactory.paymentsHistory;
    let totalPayments;
    $scope.$watch('paymentsHistory', function () {
        totalPayments = historyFactory.totalPayments();
        $scope.totalPaymentsDollar =  totalPayments.totalDollar;
        $scope.totalPaymentsLira = totalPayments.totalLira;
    }, true)

    // set active td in invoices table
    $scope.isActive = ID => {
        return $scope.activeRow === ID;
    };


    // define datepicker value
    $scope.datePickerValue = historyFactory.datePickerValue;

    function datepicker() {
        $('#invoiceDatePicker').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#invoiceDatePicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                historyFactory.datePickerValue = d;
                $scope.$digest($scope.datePickerValue = d);
            }
        }).datepicker("setDate", historyFactory.datePickerValue);
    };
    datepicker();

    // set today's date function
    $scope.today = () => {
        historyFactory.datePickerValue = DateService.getDate();
        $scope.datePickerValue = historyFactory.datePickerValue;
        datepicker();
    };

    // watch for datepicker value change and get invoices
    $scope.$watch('datePickerValue', function () {
        $scope.items = null;
        $scope.activeRow = null;
        historyFactory.fetchSalesInvoices($scope.datePickerValue);
    });

    // show invoice details 
    let selectedInvoice;
    $scope.showInvoiceDetails = (ID, totalPrice) => {
        $scope.totalPrice = totalPrice;
        let index = $scope.salesInvoices.findIndex(index => index.invoice_ID == ID);
        selectedInvoice = $scope.salesInvoices[index];
        $scope.user = $scope.salesInvoices[index]['user']
        $scope.items = $scope.salesInvoices[index]['invoice_map'];
        $scope.activeRow = ID;
    };

    // delete invoice
    $scope.deleteInvoice = function () {
        historyFactory.deleteInvoice(selectedInvoice).then(() => {
            $scope.activeRow = null;
            $scope.items = null
        })
        // NotificationService.showWarning().then(ok => {
        //     if (ok.isConfirmed) {
        //         historyFactory.deleteInvoice(selectedInvoice, $scope.tabSelected, $scope.datePickerValue).then(function () {
        //             $scope.activeRow = null;
        //             $scope.items = null
        //         });
        //     }
        // });
    };

})