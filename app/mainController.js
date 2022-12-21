const app = angular.module('mainApp', ['angularUtils.directives.dirPagination', 'ngRoute', 'ngFileUpload']);

// Route Providers
app.config(function ($routeProvider) {

    $routeProvider

        .when('/services', {
            templateUrl: 'view/services.html',
            controller: 'servicesController'
        })

        // .when('/sell', {
        //     templateUrl: 'sell.html',
        //     controller: 'sellController'
        // })

        .when('/stock', {
            templateUrl: 'view/stock.html',
            controller: 'stockController'
        })

        // .when('/history', {
        //     templateUrl: 'history.html',
        //     controller: 'historyController'
        // })

        // .when('/customers', {
        //     templateUrl: 'customers.html',
        //     controller: 'customersController'
        // })

        // .when('/debts', {
        //     templateUrl: 'debts.html',
        //     controller: 'debtsController'
        // })

        // .when('/payments', {
        //     templateUrl: 'payments.html',
        //     controller: 'paymentsController'
        // })

        // .when('/reports', {
        //     templateUrl: 'reports.html',
        //     controller: 'reportsController'
        // })

        // .when('/reminders', {
        //     templateUrl: 'reminders.html',
        //     controller: 'remindersController'
        // })

        .when('/settings', {
            templateUrl: 'view/settings.html',
            controller: 'settingsController'
        })

        .otherwise({
            redirectTo: '/services'
        });
});

// Main Factory Model
app.factory('mainFactory', function () {
    let model = {};


    model.getPackages = async () => {
        let response = await window.electron.ipcRenderer.invoke('read-package');
        if (response) {
            return response;
        }
    }

    return model;
})

// Controller
app.controller('mainController', function ($scope, NotificationService) {

    // Logout
    $scope.logout = function () {
        NotificationService.showWarning().then(ok => {
            if (ok) {
                localStorage.removeItem('setting');
                window.location.replace('login.html');
            }
        })
    };
});