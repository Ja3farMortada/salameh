app.directive('customersSettings', function (customersFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/customersSettings.html',
        scope: {

        },
        link: function (scope) {

            scope.customers = customersFactory.customers;


            scope.openNewCustomerModal = () => {
                scope.selectedModal = 'add';
                scope.modalTitle = 'Add New Customer';
                scope.customerDetails = {
                    customer_name: null,
                    customer_phone: null,
                    customer_address: null,
                    customer_debit: 0
                };

                $('#customerModal').modal('show');
                $('#customerModal').on('shown.bs.modal', function () {
                    $(this).find('[autofocus]').focus();
                });
            };

            let index;
            scope.openEditCustomerModal = ID => {
                scope.selectedModal = 'edit';
                scope.modalTitle = 'Edit Customer';
                index = scope.customers.findIndex(index => index.customer_ID == ID);
                scope.customerDetails = {};
                angular.copy(scope.customers[index], scope.customerDetails);
                $('#customerModal').modal('show');
                $('#customerModal').on('shown.bs.modal', function () {
                    $(this).find('[autofocus]').focus();
                });
            };

            function addCustomer() {
                customersFactory.addCustomer(scope.customerDetails);
            };

            function editCustomer() {
                customersFactory.editCustomer(scope.customerDetails).then(function (response) {
                    angular.copy(response[0], scope.customers[index]);
                })
            };

            scope.submit = () => {
                switch (scope.selectedModal) {
                    case 'add':
                        addCustomer();
                        break;
                    case 'edit':
                        editCustomer();
                        break;
                }
            };
        }
    }
});