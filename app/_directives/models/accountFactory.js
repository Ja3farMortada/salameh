app.factory('accountFactory', ['$http', 'NotificationService', function($http, NotificationService) {
    // define URL
    const url = `http://localhost:3000`;

    var model = {};
    model.users = [];
   
    // get users cached function
    const getUsers = function () {
        return $http.get(`${url}/getUsers`).then(function (response) {
            angular.copy(response.data, model.users);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getUsers = getUsers(); // expose the function to the outer execution context

    // update username
    model.editUsername = data => {
        return $http.post(`${url}/editUsername`, data).then(function (response) {
            localStorage.setItem('setting', JSON.stringify(response.data[0]));
            NotificationService.showSuccess();
            $('#editUsernameModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#editUsernameModal').modal('toggle');
        });
    };

    // change password
    model.changePassword = data => {
        return $http.post(`${url}/editPassword`, data).then(function (response) {
            localStorage.setItem('setting', JSON.stringify(response.data[0]));
            NotificationService.showSuccess();
            $('#changePasswordModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#changePasswordModal').modal('toggle');
        });
    };

    // add new user
    model.addUser = data => {
        return $http.post(`${url}/addUser`, data).then(function (response) {
            model.users.push(response.data[0]);
            NotificationService.showSuccess();
            $('#addUserModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#addUserModal').modal('toggle');
        });
    };

    // edit user
    model.editUser = data => {
        return $http.post(`${url}/editUser`, data).then(function (response) {
            angular.copy(response.data, model.users);
            NotificationService.showSuccess();
            $('#editUserModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#editUserModal').modal('toggle');
        });
    };

    // delete user
    model.deleteUser = data => {
        return $http.post(`${url}/deleteUser`, data).then(function (response) {
            angular.copy(response.data, model.users);
            NotificationService.showSuccess();
            $('#editUserModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#editUserModal').modal('toggle');
        });
    };

    // update permissions
    model.updatePermissions = data => {
        return $http.post(`${url}/updatePermissions`, data).then(function (response) {
            angular.copy(response.data, model.users);
            NotificationService.showSuccess();
            $('#permissionsModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#permissionsModal').modal('toggle');
        });
    };

    // enable/disable user
    model.updateUserStatus = data => {
        return $http.post(`${url}/updateUserStatus`, data).then(function (response) {
            angular.copy(response.data, model.users);
            NotificationService.showSuccess();
        }, function () {
            NotificationService.showError();
        });
    };

    return model;
}]);