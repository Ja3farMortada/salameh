app.controller('servicesController', function($scope, servicesFactory) {

    // tab selection
    $scope.tabSelected = servicesFactory.tabSelected;
    $scope.selectService = index => {
        servicesFactory.selectTab(index);
        $scope.tabSelected = servicesFactory.tabSelected;
    };

    // bind scope with model factory
    $scope.services = servicesFactory.services;
})