const app = angular.module('mainApp', ['angularUtils.directives.dirPagination', 'ngRoute', 'ngFileUpload']);

// Route Providers
app.config(function ($routeProvider) {

    $routeProvider

        .when('/sell', {
            templateUrl: 'view/sell.html',
            controller: 'sellController'
        })

        .when('/stock', {
            templateUrl: 'view/stock.html',
            controller: 'stockController'
        })

        .when('/history', {
            templateUrl: 'view/history.html',
            controller: 'historyController'
        })

        .when('/debts', {
            templateUrl: 'view/debts.html',
            controller: 'debtsController'
        })

        .when('/settings', {
            templateUrl: 'view/settings.html',
            controller: 'settingsController'
        })

        .otherwise({
            redirectTo: '/sell'
        });
});

// Main Factory Model
app.factory('mainFactory', function () {
    let model = {};

    model.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    model.getPackages = async () => {
        let response = await window.electron.ipcRenderer.invoke('read-package');
        if (response) {
            return response;
        }
    }

    return model;
})

// Controller
app.controller('mainController', function ($scope, NotificationService, $rootScope, $location, mainFactory) {

    // select tab
    $rootScope.$on('$routeChangeSuccess', function() {
        $scope.tabSelected = $location.path();
    });

    // Logout
    $scope.logout = function () {
        NotificationService.showWarning().then(ok => {
            if (ok) {
                localStorage.removeItem('setting');
                window.location.replace('index.html');
            }
        })
    };

    $scope.theme = localStorage.getItem('theme') || 'dark';
    $scope.toggleTheme = mode => {
        $scope.theme = mode;
        localStorage.setItem('theme', mode);
    }

    mainFactory.getPackages().then(response => {
        $scope.$digest($scope.package = response);
    });


    // Update Logic
    $scope.checked = false;
    $scope.showSpinner = false;
    $scope.download = false;
    $scope.downloaded = false;
    $scope.downloading = false;

    $scope.openUpdateModal = function () {
        $scope.text = null;
        $('#updateModal').modal('show');
    };
    $scope.checkForUpdates = function () {
        $scope.checked = true;
        $scope.text = null;
        window.electron.ipcRenderer.send('update');
    };
    $scope.downloadUpdate = function () {
        $scope.download = false;
        $scope.showSpinner = true;
        window.electron.ipcRenderer.send('download');
    }

    // render messages from server
    window.electron.receive('checking-for-update', function (event, data) {
        $scope.$digest($scope.showSpinner = true);
        $scope.$digest($scope.text = data);
    });
    window.electron.receive('update-available', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.download = true);
        $scope.$digest($scope.text = `version ${data.version} is available.`);
    });
    window.electron.receive('up-to-date', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.checked = false);
        $scope.$digest($scope.text = `your current version is up-to-date.`);
        console.log(data);
    });
    window.electron.receive('error', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.checked = false);
        $scope.$digest($scope.download = false);
        $scope.$digest($scope.text = `an error has occured!.`);
        console.log(data);
    });
    window.electron.receive('downloading', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.download = false);
        $scope.$digest($scope.downloading = true);
        $scope.$digest($scope.data = data);
        $scope.$digest($scope.text = `Downloading: ${data.percent.toFixed(2)}%`)
        $('#progressBar').css("width", data.percent + "%");
        console.log(data);
    });
    window.electron.receive('downloaded', function (event, data) {
        $scope.$digest($scope.downloading = false);
        $scope.$digest($scope.downloaded = true);
        $scope.$digest($scope.download = false);
        $scope.$digest($scope.text = `Ready to install version ${data.version} of size ${((data.files[0]['size'])/1000000).toFixed(2)} MB.`)
    });

    $scope.applyUpdate = function () {
        window.electron.ipcRenderer.send('applyUpdate');
    };
    
});