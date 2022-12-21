app.directive('servicesSettings', function (servicesFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/servicesSettings.html',
        scope: {

        },
        link: function (scope) {

            scope.services = servicesFactory.services;

            // let offCanvasEl = document.getElementById('offcanvasBottom')
            const offCanvas = new bootstrap.Offcanvas(document.getElementById('serviceOffcanvas'));
            let modalType;
            scope.openOffCanvas = (type, data) => {
                if (type == 'edit') {
                    modalType = 'edit'
                    scope.modalData = {};
                    angular.copy(data, scope.modalData);
                    // scope.img = null;
                    scope.img = `http://localhost:3000${scope.modalData.image_url}`
                    offCanvas.show();
                } else {
                    modalType = 'add'
                    scope.modalData = {};
                    scope.img = null;
                    offCanvas.show();
                }
            }

            // submit offCanvas
            scope.submitService = () => {
                switch (modalType) {
                    case 'add':
                        servicesFactory.addService(scope.img, scope.modalData).then(response => {
                            // scope.services.push(response)
                            if (response) {
                                scope.modalData = {
                                    service_name: null,
                                    service_description: null,
                                    service_type: null,
                                    service_category: null,
                                    service_sub_category: null,
                                    service_cost: null,
                                    service_price: null,
                                    service_notes: null
                                }
                                scope.img = null;
                            }
                        })
                        break;
                    case 'edit':
                        if (scope.img.name) {
                            servicesFactory.updateServiceImage(scope.img, scope.modalData).then(response => {
                                if (response) {
                                    offCanvas.hide();
                                }
                            })
                        } else {
                            servicesFactory.updateService(scope.modalData).then(response => {
                                if (response) {
                                    offCanvas.hide()
                                }
                            })
                        }
                        break;
                }
            }

            // Delete service
            scope.deleteService = data => {
                servicesFactory.deleteService(data)
            }
        }
    }
});