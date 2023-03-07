app.controller('sellController', function ($scope, sellFactory, stockFactory, rateFactory, sayrafaFactory, NotificationService) {

    // define and trigger focus on barcode input
    $scope.triggerFocus = () => {
        $('#barcodeInput').trigger('focus');
        $scope.barcodeInput = null;
    };

    // on load controller 
    let rateSubscription;
    let sayrafaSubscription;
    let invoiceSubscribtion;
    let onHoldSubscribtion;
    let tabSubscribtion;
    let categoriesSubscription;
    let itemsSubscription;
    let selectedCategorySubscription;
    let searchSubscription;
    $scope.$on('$viewContentLoaded', () => {
        rateSubscription = rateFactory.exchangeRate.subscribe(res => {
            $scope.exchangeRate = res;
            calculateTotal()
        })
        sayrafaSubscription = sayrafaFactory.sayrafaRate.subscribe(res => {
            $scope.sayrafaRate = res;
            calculateTotal()
        })

        invoiceSubscribtion = sellFactory.invoice.subscribe(res => {
            $scope.invoice = res;
        });

        onHoldSubscribtion = sellFactory.invoicesOnHold.subscribe(res => {
            $scope.invoicesOnHold = res;
        });

        tabSubscribtion = sellFactory.selectedTab.subscribe(res => {
            $scope.selectedTab = res;
        })
        categoriesSubscription = stockFactory.categories.subscribe(res => {
            $scope.categories = res;
        })
        itemsSubscription = stockFactory.items.subscribe(res => {
            $scope.items = res;
        })
        selectedCategorySubscription = sellFactory.selectedCategory.subscribe(res => {
            $scope.selectedCategory = res;
        })
        searchSubscription = sellFactory.searchVal.subscribe(res => {
            $scope.searchVal = res;
        })

        $scope.triggerFocus();

    })

    // on destroy controller
    $scope.$on('$destroy', () => {
        document.removeEventListener('keydown', e => {
            console.log(e);
        })
        rateSubscription.unsubscribe();
        sayrafaSubscription.unsubscribe();
        invoiceSubscribtion.unsubscribe();
        onHoldSubscribtion.unsubscribe();
        tabSubscribtion.unsubscribe();
        categoriesSubscription.unsubscribe();
        itemsSubscription.unsubscribe();
        selectedCategorySubscription.unsubscribe();
        searchSubscription.unsubscribe();
    })

    // set category
    $scope.setCategory = category => {
        sellFactory.selectedCategory.next(category);
        $scope.searchVal.category_ID_FK = category.category_ID;
        $scope.triggerFocus();
    }

    // initialize Round calculation function
    $scope.round = data => {
        return Math.ceil(data / $scope.exchangeRate.round_value) * $scope.exchangeRate.round_value;
    }
    $scope.sayrafaRound = data => {
        return Math.ceil(data / $scope.sayrafaRate.round_value) * $scope.sayrafaRate.round_value;
    }

    // watch for invoice changes and calculate invoice's total cost and price
    let total;

    function calculateTotal() {
        total = sellFactory.total();
        $scope.totalCost = total.totalCost;
        $scope.totalPrice = total.totalPrice;
    }
    $scope.$watch('invoice', function () {
        calculateTotal();
        $scope.triggerFocus();
    }, true);


    // define itemToAdd Variable
    let itemToAdd;
    let unitPrice;
    $scope.mouseEvent = (event, data) => {
        event.preventDefault()
        switch (event.which) {
            // left click mouse
            case 1:
                switch (data.currency) {
                    case 'sayrafa':
                        unitPrice = $scope.sayrafaRound(data.item_price * $scope.sayrafaRate.rate_value)
                        break;
                    case 'dollar':
                        unitPrice = $scope.round(data.item_price * $scope.exchangeRate.rate_value);
                        break;
                    case 'lira':
                        unitPrice = data.item_price;
                        break;

                }
                itemToAdd = {
                    item_ID: data.item_ID,
                    barcode: data.barcode,
                    item_description: data.item_description,
                    currency: data.currency,
                    exchange_rate: $scope.exchangeRate.rate_value,
                    sayrafa_rate: $scope.sayrafaRate.rate_value,
                    unit_cost: data.item_cost,
                    original_price: data.item_price,
                    unit_price: unitPrice,
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
                break;

                // right click mouse
            case 3:
                console.log(data);
        }
    }

    // scan barcode logic
    $scope.submitBarcode = () => {
        if ($scope.barcodeInput) {
            // if ($scope.barcodeInput.toString().length > 10) {
            sellFactory.submitBarcode($scope.barcodeInput).then(response => {
                if (response) {
                    switch (response.currency) {
                        case 'sayrafa':
                            unitPrice = $scope.sayrafaRound(response.item_price * $scope.sayrafaRate.rate_value)
                            break;
                        case 'dollar':
                            unitPrice = $scope.round(response.item_price * $scope.exchangeRate.rate_value);
                            break;
                        case 'lira':
                            unitPrice = response.item_price;
                            break;

                    }
                    itemToAdd = {
                        item_ID: response.item_ID,
                        barcode: response.barcode,
                        item_description: response.item_description,
                        currency: response.currency,
                        exchange_rate: $scope.exchangeRate.setting_value,
                        sayrafa_rate: $scope.sayrafaRate.rate_value,
                        unit_cost: response.item_cost,
                        original_price: response.item_price,
                        unit_price: unitPrice,
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
            NotificationService.showWarning().then(async res => {
                if (res.isConfirmed) {
                    let response = await sellFactory.checkout($scope.invoice);
                    if (response == 'success') {
                        if ($scope.selectedTab) {
                            // $scope.$digest($scope.deleteInvoice($scope.selectedTab - 1));
                            $scope.$digest($scope.invoicesOnHold.splice(($scope.selectedTab - 1), 1));
                            $scope.$digest(sellFactory.clearInvoice());
                        }
                        $scope.$digest(sellFactory.clearInvoice());
                    }
                }
            })
        }
    }
    // takeaway (checkout & print)
    // $scope.takeaway = () => {
    //     if ($scope.invoice.length > 0) {
    //         NotificationService.showWarning().then(async res => {
    //             if (res.isConfirmed) {
    //                 let response = await sellFactory.checkout($scope.invoice, 'takeaway');
    //                 if (response == 'success') {
    //                     if ($scope.selectedTab) {
    //                         $scope.$digest($scope.invoicesOnHold.splice(($scope.selectedTab - 1), 1));
    //                         $scope.$digest(sellFactory.clearInvoice());
    //                     }
    //                     $scope.$digest(sellFactory.clearInvoice());
    //                 }
    //             }
    //         })
    //     }
    // }

    // substract Qty
    $scope.substractQty = index => {
        if ($scope.invoice[index].qty == 1) {
            $scope.invoice.splice(index, 1);
        } else {
            $scope.invoice[index].qty -= 1;
        }
    }

    // add Qty
    $scope.addQty = index => {
        $scope.invoice[index].qty += 1;
    }

    // clear invoice
    $scope.clearInvoice = () => {
        if ($scope.invoice.length > 0) {
            sellFactory.clearInvoice()
        }
    }

    $scope.holdInvoice = () => {
        let invoice = [];
        angular.copy($scope.invoice, invoice);
        let title = undefined;
        if ($scope.invoicesOnHold.at(-1)) {
            title = $scope.invoicesOnHold.at(-1)[0]
        }
        $scope.invoicesOnHold.push([(title + 1) || 0, invoice]);
        sellFactory.clearInvoice();
    }

    $scope.switchHoldedInvoice = index => {
        sellFactory.selectedTab.next(index + 1)
        sellFactory.invoice.next($scope.invoicesOnHold[index][1])

    }

    $scope.deleteInvoice = index => {
        NotificationService.showWarning().then(res => {
            if (res.isConfirmed) {
                $scope.$digest($scope.invoicesOnHold.splice(index, 1));
                $scope.$digest(sellFactory.clearInvoice());
            }
        })
    }

    // open edit price modal
    // priceModal
    const priceModal = new bootstrap.Modal('#priceModal');
    $('#priceModal').on('shown.bs.modal', () => {
        $('#newPrice').trigger('focus');
    });
    $('#priceModal').on('hidden.bs.modal', () => {
        $scope.triggerFocus()
    })

    let selectedInvoiceIndex;
    $scope.openPriceModal = index => {
        $scope.priceModalData = {
            newPrice: null,
            currency: null,
            original_currency: $scope.invoice[index].currency
        };
        selectedInvoiceIndex = index;
        $scope.dataToEdit = {};
        angular.copy($scope.invoice[index], $scope.dataToEdit);
        priceModal.show();
    }

    $scope.submitNewPrice = () => {
        let data = $scope.invoice[selectedInvoiceIndex];
        if ($scope.priceModalData.currency == 'lira' || $scope.priceModalData.currency == null) {
            data['unit_price'] = $scope.priceModalData.newPrice;
        } else {
            data['original_price'] = $scope.priceModalData.newPrice;
            data['unit_price'] = data['currency'] == 'dollar' ? $scope.round(data.original_price * $scope.exchangeRate.rate_value) : $scope.sayrafaRound(data.original_price * $scope.sayrafaRate.rate_value);
        }
        priceModal.hide();
    }

});