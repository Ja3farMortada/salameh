app.factory('servicesFactory', function ($http, NotificationService, Upload) {

    let url = `http://localhost:3000`

    var model = {};

    model.tabSelected = 0;
    model.services = [];

    // tab selection
    model.selectTab = function (tab) {
        if (this.tabSelected != tab) {
            switch (tab) {
                case 0:
                    this.tabSelected = 0;
                    break;

                case 1:
                    this.tabSelected = 1;
                    break;

                case 2:
                    this.tabSelected = 2;
                    break;

                case 3:
                    this.tabSelected = 3;
                    break;
            }
        }
    };

    // get services
    const getServices = () => {
        return $http.get(`${url}/getServices`).then(function (response) {
            angular.copy(response.data, model.services);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    getServices();

    // add service
    model.addService = (file, data) => {
        return Upload.upload({
            url: `${url}/addService`,
            method: 'POST',
            file: file,
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            model.services.push(response.data);
            return response.data;
        }, error => {
            console.log(error);
            NotificationService.showError(error)
        });
    }

    // update service with image
    model.updateServiceImage = (file, data) => {
        return Upload.upload({
            url: `${url}/updateServiceImage`,
            method: 'POST',
            file: file,
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            let index = model.services.findIndex(x => x.service_ID == response.data.service_ID);
            model.services[index] = response.data;
            return response.data;
        }, error => {
            console.log(error);
            NotificationService.showError(error)
        });
    }

    // update service only, image has not been changed
    model.updateService = data => {
        return $http.post(`${url}/updateService`, {
            data: data
        }).then(response => {
            NotificationService.showSuccess();
            let index = model.services.findIndex(x => x.service_ID == response.data.service_ID);
            model.services[index] = response.data;
            return response.data;
        }, error => {
            NotificationService.showError(error);
        })
    }

    // delete service
    model.deleteService = data => {
        NotificationService.showWarning().then(ok => {
            if (ok.isConfirmed) {
                $http.post(`${url}/deleteService`, {
                    data: data
                }).then(response => {
                    if (response == 'deleted') {
                        let index = model.services.findIndex(x => x.service_ID == data.service_ID);
                        model.services.splice(index, 1);
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