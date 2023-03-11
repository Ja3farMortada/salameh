app.factory('stockFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://localhost:3000`;


    var model = {};
    model.categories = new BehaviorSubject([]);
    model.items = new BehaviorSubject([]);
    model.searchVal = new BehaviorSubject({
        category_ID_FK: null
    });

    model.selectedCategory = new BehaviorSubject({
        // category_name: null
    });

    model.selectedTab = 'stock';
    model.setTab = tab => {
        model.selectedTab = tab;
    }

    model.itemsPerPage = new BehaviorSubject({
        name: '10',
        value: 10
    });

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


    // ##################################### CATEGORIES #######################################
    
    // Get categories
    const getCategories = () => {
        $http.get(`${url}/getCategories`).then(response => {
            model.categories.next(response.data);
        }, error => {
            NotificationService.showError(error);
        });
    };
    getCategories();

    // fetch categories
    model.fetchCategories = () => {
        $http.get(`${url}/getCategories`).then(response => {
            model.categories.next(response.data);
        }, error => {
            NotificationService.showError(error);
        });
    }

    // add category
    model.addCategory = data => {
        return $http.post(`${url}/addCategory`, {
            data,
            data
        }).then(response => {
            NotificationService.showSuccess();
            let values = model.categories._value;
            values.push(response.data);
            model.categories.next(values);
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
            let values = model.categories._value;
            let index = values.findIndex(x => x.category_ID == response.data.category_ID);
            values[index] = response.data;
            model.categories.next(values)
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // // delete category
    model.deleteCategory = data => {
        return NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                return $http.post(`${url}/deleteCategory`, {
                    data: data
                }).then(response => {
                    if (response.data == 'deleted') {
                        let value = model.categories.value;
                        let index = value.findIndex(x => x.category_ID == data.category_ID);
                        value.splice(index, 1);
                        model.categories.next(value)
                        NotificationService.showSuccess();
                        return response.data;
                    }
                }, error => {
                    NotificationService.showError(error);
                })
            }
        })
    }

    // sort categories
    model.sortCategories = data => {
        $http.post(`${url}/sortCategories`, data).then(response => {

        }, error => {
            NotificationService.showError(error);
        } )
    }


    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ITEMS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // get items
    const getItems = () => {
        $http.get(`${url}/getItems`).then(response => {
            model.items.next(response.data)
        }, error => {
            NotificationService.showError(error);
        });
    };
    getItems();

    // check barcode
    model.checkBarcode = data => {
        return $http.post(`${url}/checkBarcode`, {data, data}).then(response => {
            if (response.data.length > 0) return false;
            return true;
        }, error => {
            NotificationService.showError(error)
        })
    }

    // add item
    model.addItem = data => {
        return $http.post(`${url}/addItem`, {
            data,
            data
        }).then(response => {
            NotificationService.showSuccess();
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // update item
    model.updateItem = data => {
        return $http.post(`${url}/updateItem`, {
            data: data
        }).then(response => {
            NotificationService.showSuccess();
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
                        let value = model.items.value;
                        let index = value.findIndex(x => x.item_ID == data.item_ID);
                        value.splice(index, 1);
                        model.items.next(value);
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