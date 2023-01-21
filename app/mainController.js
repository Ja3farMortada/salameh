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
app.controller('mainController', function ($scope, NotificationService, $rootScope, $location) {

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
        // if ($scope.theme == 'light') {
        //     $scope.theme = 'dark';
        //     localStorage.setItem('theme', 'dark');
        //     return;
        // }
        $scope.theme = mode;
        localStorage.setItem('theme', mode);
    }
});