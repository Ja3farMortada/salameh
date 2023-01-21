app.controller('sellController', function ($scope, sellFactory, stockFactory, vouchersFactory, customersFactory, NotificationService) {

    $scope.items = stockFactory.items;
    // $scope.noBarcodeItems = stockFactory.noBarcodeItems;
    $scope.vouchers = vouchersFactory.shownVouchers;
    $scope.invoice = sellFactory.invoice;
    $scope.exchangeRate = sellFactory.exchangeRate;
    $scope.selectedCategory = sellFactory.selectedCategory;
    $scope.customers = customersFactory.customers; // customers


    // define and trigger focus on barcode input
    ($scope.triggerFocus = () => {
        $('#barcodeInput').trigger('focus');
        $scope.barcodeInput = null;
    })();

    // set vouchers -category
    $scope.setCategory = category => {
        sellFactory.setCategory(category);
        $scope.selectedCategory = sellFactory.selectedCategory;
        $scope.triggerFocus();
    }


    // watch for invoice changes and calculate invoice's total cost and price
    let total;
    $scope.$watch('invoice', function () {
        total = sellFactory.total();
        $scope.totalCost = total.totalCost;
        $scope.totalPrice = total.totalPrice;
    }, true);


    // define itemToAdd Variable
    let itemToAdd;

    // add voucher to invoice
    $scope.addVoucher = data => {
        itemToAdd = {
            item_ID: data.item_ID,
            item_description: data.item_description,
            currency: data.currency,
            exchange_rate: $scope.exchangeRate.setting_value,
            unit_cost: data.item_cost,
            unit_price: data.item_price,
            qty: 1
        }
        let found = false;
        for (let i = 0; i < $scope.invoice.length; i++) {
            if ($scope.invoice[i].item_ID == itemToAdd.item_ID) {
                $scope.invoice[i].qty += 1;
                found = true;
                break;
            }
        }
        if (!found) {
            $scope.invoice.push(itemToAdd)
        }
        $scope.triggerFocus();
    }

    // scan barcode logic
    $scope.submitBarcode = () => {
        if ($scope.barcodeInput) {
            // if ($scope.barcodeInput.toString().length > 10) {
            sellFactory.submitBarcode($scope.barcodeInput).then(response => {
                if (response) {
                    itemToAdd = {
                        item_ID: response.item_ID,
                        barcode: response.barcode,
                        item_description: response.item_description,
                        currency: response.currency,
                        exchange_rate: $scope.exchangeRate.setting_value,
                        unit_cost: response.item_cost,
                        unit_price: response.item_price,
                        qty: 1
                    }
                    let found = false;
                    for (let i = 0; i < $scope.invoice.length; i++) {
                        if ($scope.invoice[i].item_ID == itemToAdd.item_ID) {
                            $scope.invoice[i].qty += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        $scope.invoice.push(itemToAdd)
                    }
                    $scope.triggerFocus();
                } else {
                    NotificationService.showErrorText('Item not defined!').then(() => {
                        $scope.$digest($scope.triggerFocus());
                    })
                }
            })

        // else if barcode field is empty, thus checkout
        } else {
            // checkout
            $scope.checkout();
        }
    }

    // submit name from datalist
    $scope.submitName = () => {
        let foundInItems = false;
        $scope.items.forEach(element => {
            if (element.item_description == $scope.inputName) {
                itemToAdd = {
                    item_ID: element.item_ID,
                    barcode: element.barcode,
                    item_description: element.item_description,
                    currency: element.currency,
                    exchange_rate: $scope.exchangeRate.setting_value,
                    unit_cost: element.item_cost,
                    unit_price: element.item_price,
                    qty: 1
                }
                let found = false;
                for (let i = 0; i < $scope.invoice.length; i++) {
                    if ($scope.invoice[i].item_ID == itemToAdd.item_ID) {
                        $scope.invoice[i].qty += 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $scope.invoice.push(itemToAdd)
                }
                $scope.inputName = null;
                foundInItems = true;
                return;
            } 
        });
        if (!foundInItems) {
            NotificationService.showErrorText('Item not defined!').then(() => {
                $scope.$digest($scope.inputName = null);
            })
        }
    }

    // checkout
    $scope.checkout = () => {
        if ($scope.invoice.length > 0) {
            NotificationService.showWarning().then(res => {
                if (res.isConfirmed) {
                    sellFactory.checkout($scope.invoice).then(() => {
                        $scope.invoice = sellFactory.invoice;
                        $scope.triggerFocus()
                    })
                } else {
                    $scope.triggerFocus()
                }
            })
        } else {
            $scope.triggerFocus()
        }
    }

    // remove from invoice
    $scope.removeItem = index => {
        $scope.invoice.splice(index, 1);
        $scope.triggerFocus()
    }

    // clear invoice
    $scope.clearInvoice = () => {
        if ($scope.invoice.length > 0) {
            NotificationService.showConfirm().then(ok => {
                if (ok.isConfirmed) {
                    sellFactory.invoice = [];
                    $scope.$digest($scope.invoice = sellFactory.invoice);
                    $scope.triggerFocus();
                } else {
                    $scope.triggerFocus();
                }
            })
        } else {
            $scope.triggerFocus()
        }
    }

    // open modal to choose customer
    const customersModal = new bootstrap.Modal('#customerModal');
    const select_box = document.querySelector('#customer_select');
    $scope.openCustomerModal = () => {
        $scope.selectedCustomer = null;
        if ($scope.invoice.length > 0) {
            customersModal.show();
            $('#customerModal').on('shown.bs.modal', () => {
                // use dselect library to enable live search within select
                dselect(select_box, {
                    search: true,
                    clearable: true
                })
            })
        } else {
            $scope.triggerFocus()
        }
    }

    // checkout invoice if customer selected
    $scope.checkoutCustomer = () => {
        if ($scope.selectedCustomer) {
            NotificationService.showWarning().then(res => {
                if (res.isConfirmed) {
                    sellFactory.customerCheckout($scope.selectedCustomer, $scope.invoice).then(() => {
                        customersModal.hide();
                        $scope.invoice = sellFactory.invoice;
                        $scope.triggerFocus();
                    })
                }
            })
        }
    }

    // focus barcode if enter or esc or space is pressed
    Mousetrap.bindGlobal(['enter', 'esc', 'space'], (e) => {
        if (document.activeElement == document.body) {
            e.preventDefault()
            $scope.triggerFocus();
        }
    })

    // press up arrow key to select previous input
    Mousetrap.bindGlobal('up', (e) => {
        e.preventDefault();
        // check for focused input
        let focusedInput = $(':focus');
        if (focusedInput[0]) {
            let prevInput = $(focusedInput).closest('tr').prev().find('input');
            if (prevInput[0]) {
                $(prevInput).trigger('select');
            }
        } else {
            $scope.triggerFocus()
        }
    })

    // press down key to select next input
    Mousetrap.bindGlobal('down', (e) => {
        e.preventDefault();
        // check for focused input
        let focusedInput = $(':focus');
        if (focusedInput[0]) {
            let nextInput = $(focusedInput).closest('tr').next().find('input');
            if (nextInput[0]) {
                $(nextInput).trigger('select');
            }
        } else {
            $scope.triggerFocus()
        }
    })

});