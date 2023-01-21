app.factory('stockFactory', function($http, NotificationService) {

    // define URL
    const url = `http://localhost:3000`;


    var model = {};
    model.items = [];
    // model.noBarcodeItems = [];
    model.categories = [];

    model.itemsPerPage = {
        value: 15
    };
    model.options = [];
    // items per page
    model.setItemsPerPage = () => {
        return options = [{
                name: "10",
                value: 10
            },
            {
                name: "15",
                value: 15
            },
            {
                name: "30",
                value: 30
            },
            {
                name: "50",
                value: 50
            },
            {
                name: "100",
                value: 100
            },
        ]
    }


    // get items
    const getItems = () => {
        $http.get(`${url}/getItems`).then(response => {
            angular.copy(response.data, model.items);
        }, error => {
            NotificationService.showError(error);
        });
    };
    getItems();

    // get items that does not have barcode for datalist
    // const getNoBarcodeItems = () => {
    //     $http.get(`${url}/getNoBarcodeItems`).then(response => {
    //         console.log(response.data);
    //         angular.copy(response.data, model.noBarcodeItems);
    //     }, error => {
    //         NotificationService.showError(error);
    //     })
    // }
    // getNoBarcodeItems();
    // // fetch above items
    // model.fetchNoBarcodeItems = () => {
    //     $http.get(`${url}/getNoBarcodeItems`).then(response => {
    //         angular.copy(response.data, model.noBarcodeItems);
    //     }, error => {
    //         NotificationService.showError(error);
    //     })
    // }

    // add item
    model.addItem = data => {
        return $http.post(`${url}/addItem`, {data, data}).then(response => {
            NotificationService.showSuccess();
            model.items.unshift(response.data);
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // check barcode
    model.checkBarcode = data => {
        return $http.post(`${url}/checkBarcode`, {data, data}).then(response => {
            if (response.data.length > 0) return false;
            return true;
            // return response;
        }, error => {
            NotificationService.showError(error)
        })
    }

    // update item
    model.updateItem = data => {
        return $http.post(`${url}/updateItem`, {
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            let index = model.items.findIndex(x => x.item_ID == response.data.item_ID);
            model.items[index] = response.data;
            console.log(response.data);
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // // delete item
    model.deleteItem = data => {
        NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                $http.post(`${url}/deleteItem`, {
                    data: data
                }).then(response => {
                    if (response.data == 'deleted') {
                        let index = model.items.findIndex(x => x.item_ID == data.item_ID);
                        model.items.splice(index, 1);
                        NotificationService.showSuccess();
                    }
                }, error => {
                    NotificationService.showError(error);
                })
            }
        })
    }

    // Get categories
    const getCategories = () => {
        $http.get(`${url}/getCategories`).then(function (response) {
            angular.copy(response.data, model.categories);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getCategories();

    // fetch categories
    model.fetchCategories = () => {
        $http.get(`${url}/getCategories`).then(function (response) {
            angular.copy(response.data, model.categories);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // add category
    model.addCategory = data => {
        return $http.post(`${url}/addCategory`, {data, data}).then(response => {
            NotificationService.showSuccess();
            model.categories.push(response.data);
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // update category
    model.updateCategory = data => {
        return $http.post(`${url}/updateCategory`, {
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            let index = model.categories.findIndex(x => x.category_ID == response.data.category_ID);
            model.categories[index] = response.data;
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // // delete category
    model.deleteCategory = data => {
        NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                $http.post(`${url}/deleteCategory`, {
                    data: data
                }).then(response => {
                    if (response.data == 'deleted') {
                        let index = model.categories.findIndex(x => x.category_ID == data.category_ID);
                        model.categories.splice(index, 1);
                        NotificationService.showSuccess();
                    }
                }, error => {
                    NotificationService.showError(error);
                })
            }
        })
    }

    return model;
})