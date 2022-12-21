app.directive('generalSettings', function (generalFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/generalSettings.html',
        scope: {

        },
        link: function (scope) {

            scope.backupDB = function () {
                generalFactory.backupDB();
            }
        }
    }
});