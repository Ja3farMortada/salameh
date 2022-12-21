app.controller('settingsController', function ($scope, settingsFactory) {


    // tab selection
    $scope.tabSelected = settingsFactory.tabSelected;
    $scope.selectTab = tab => {
        if (tab != settingsFactory.tabSelected) {
            settingsFactory.selectTab(tab);
            $scope.tabSelected = settingsFactory.tabSelected;
        }
    };


});