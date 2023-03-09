app.directive('customersSettings', function (customersFactory, mainFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/customersSettings.html',
        scope: {

        },
        link: function (scope) {

            scope.customers = customersFactory.customers;

            let userSubscription;
            userSubscription = mainFactory.loggedInUser.subscribe(res => {
                scope.loggedInUser = res;
            })

            // let offCanvasEl = document.getElementById('offcanvasBottom')
            const offCanvas = new bootstrap.Offcanvas(document.getElementById('customerOffCanvas'));

            $('#customerOffCanvas').on('shown.bs.offcanvas', event => {
                $('#nameInput').trigger('focus');
            })

            let modalType;
            scope.openOffCanvas = (type, data) => {
                if (type == 'edit') {
                    modalType = 'edit'
                    scope.modalData = {};
                    angular.copy(data, scope.modalData);
                    offCanvas.show();
                } else {
                    modalType = 'add'
                    scope.modalData = {};
                    offCanvas.show();
                }
            }

            // submit offCanvas
            scope.submit = () => {
                switch (modalType) {
                    case 'add':
                        customersFactory.addCustomer(scope.modalData).then(response => {
                            if (response) {
                                scope.modalData = {
                                    customer_name: null,
                                    customer_phone: null,
                                    customer_address: null,
                                    dollar_debt: null,
                                    sayrafa_debt: null,
                                    lira_debt: null,
                                    customer_notes: null
                                }
                                $('#nameInput').trigger('focus')
                            }
                        })
                        break;
                    case 'edit':
                        customersFactory.updateCustomer(scope.modalData).then(response => {
                            if (response) {
                                offCanvas.hide()
                            }
                        })

                        break;
                }
            }

            // Delete service
            scope.deleteCustomer = data => {
                customersFactory.deleteCustomer(data);
            }
        }
    }
});