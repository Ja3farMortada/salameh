app.factory('vouchersFactory', function ($http, NotificationService, Upload) {

    let url = `http://localhost:3000`

    var model = {};

    model.tabSelected = 0;
    model.itemsPerPage = {
        value: 12
    };
    model.vouchers = [];
    model.shownVouchers = []; // for sell page

    // get vouchers
    const getVouchers = () => {
        return $http.get(`${url}/getVouchers`).then(function (response) {
            angular.copy(response.data, model.vouchers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getVouchers();

    // get vouchers
    const getShownVouchers = () => {
        return $http.get(`${url}/getShownVouchers`).then(function (response) {
            angular.copy(response.data, model.shownVouchers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getShownVouchers();

    model.fetchShownVouchers = () => {
        $http.get(`${url}/getShownVouchers`).then(function (response) {
            angular.copy(response.data, model.shownVouchers);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // add voucher without image
    model.addVoucher = data => {
        return $http.post(`${url}/addVoucher`, data).then(response => {
            NotificationService.showSuccess();
            model.vouchers.push(response.data);
            if (response.data.show_on_sell) {
                model.fetchShownVouchers()
            }
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // add voucher with image
    model.addVoucherWithImage = (file, data) => {
        return Upload.upload({
            url: `${url}/addVoucherWithImage`,
            method: 'POST',
            file: file,
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            model.vouchers.push(response.data);
            if (response.data.show_on_sell) {
                model.fetchShownVouchers()
            }
            return response.data;
        }, error => {
            NotificationService.showError(error)
        });
    }

    // update voucher with image
    model.updateVoucherImage = (file, data) => {
        return Upload.upload({
            url: `${url}/updateVoucherImage`,
            method: 'POST',
            file: file,
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            let index = model.vouchers.findIndex(x => x.item_ID == response.data.item_ID);
            model.vouchers[index] = response.data;
            model.fetchShownVouchers()
            return response.data;
        }, error => {
            NotificationService.showError(error)
        });
    }

    // update voucher only, image has not been changed
    model.updateVoucher = data => {
        return $http.post(`${url}/updateVoucher`, {
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            let index = model.vouchers.findIndex(x => x.item_ID == response.data.item_ID);
            model.vouchers[index] = response.data;
            model.fetchShownVouchers()
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // delete voucher
    model.deleteVoucher = data => {
        NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                $http.post(`${url}/deleteVoucher`, {
                    data: data
                }).then(response => {
                    if (response.data == 'deleted') {
                        let index = model.vouchers.findIndex(x => x.item_ID == data.item_ID);
                        model.vouchers.splice(index, 1);
                        model.fetchShownVouchers();
                        NotificationService.showSuccess();
                    }
                }, error => {
                    console.log(error);
                    NotificationService.showError(error);
                })
            }
        })
    }

    return model;
})