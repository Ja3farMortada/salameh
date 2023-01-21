app.controller('stockController', function ($scope, stockFactory) {

    // get items and set itemsPerPage
    $scope.items = stockFactory.items;
    $scope.options = stockFactory.setItemsPerPage();
    $scope.itemsPerPage = stockFactory.itemsPerPage;
    $scope.categories = stockFactory.categories;

    // define and trigger focus on barcode input
    ($scope.triggerFocus = () => {
        $('#barcodeSearch').trigger('select');
    })();

    // when search is submitted by barcode scanner => trigger select to improve UX
    $scope.barcodeSearch = () => {
        $scope.triggerFocus();
    }


    // define Offcanvas
    const offCanvas = new bootstrap.Offcanvas(document.getElementById('itemsOffCanvas'));
    $('#itemsOffCanvas').on('shown.bs.offcanvas', event => {
        $('#descriptionField').trigger('focus');
    })

    // open offcanvas for add or edit
    let modalType;
    $scope.openOffCanvas = (type, data) => {
        if (type == 'edit') {
            modalType = 'edit';
            $scope.modalData = {};
            angular.copy(data, $scope.modalData);
            offCanvas.show();
        } else {
            modalType = 'add'
            $scope.modalData = {
                item_description: null,
                item_type: 'barcode',
                category_ID_FK: null,
                barcode: null,
                currency: 'dollar',
                qty: null,
                item_cost: null,
                item_price: null,
                item_notes: null
            }
            $scope.barcodeExisted = false;
            offCanvas.show();
        }
    }

    // validate barcode input if set invalid
    $scope.setValid = () => {
        if ($scope.barcodeExisted) {
            $scope.barcodeExisted = false;
        }
    }

    // submit offcanvas
    $scope.submitOffCanvas = () => {
        switch (modalType) {
            case 'add':
                if ($scope.modalData.barcode) {
                    stockFactory.checkBarcode($scope.modalData.barcode).then(response => {
                        if (response) { //if barcode not existed
                            stockFactory.addItem($scope.modalData).then(response => {
                                if (response) {
                                    $scope.modalData = {
                                        item_description: null,
                                        item_type: 'barcode',
                                        barcode: null,
                                        currency: 'lira',
                                        qty: null,
                                        item_cost: null,
                                        item_price: null,
                                        item_notes: null
                                    }
                                    $('#descriptionField').trigger('focus');
                                }
                            })
                        } else {
                            $scope.barcodeExisted = true;
                            $('#barcodeInput').trigger('select');
                        }
                    })
                } else {
                    stockFactory.addItem($scope.modalData).then(response => {
                        if (response) {
                            $scope.modalData = {
                                item_description: null,
                                item_type: 'barcode',
                                barcode: null,
                                currency: 'lira',
                                qty: null,
                                item_cost: null,
                                item_price: null,
                                item_notes: null
                            }
                        }
                    })
                }
                break;

            case 'edit':
                if ($scope.modalData.item_type == 'other') {
                    $scope.modalData.barcode = null
                }
                stockFactory.updateItem($scope.modalData).then(response => {
                    if (response) {
                        offCanvas.hide();
                        $scope.triggerFocus();
                    }
                })
                break;
        }
    }

    // Delete Item
    $scope.deleteItem = data => {
        stockFactory.deleteItem(data);
    }

});