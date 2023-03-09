app.factory('accountFactory', function($http, mainFactory, NotificationService) {
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
        $http.post(`${url}/editUsername`, data).then(function (response) {
            $('#editUsernameModal').modal('toggle');
            localStorage.setItem('setting', JSON.stringify(response.data));
            mainFactory.loggedInUser.next(response.data);
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // change password
    model.changePassword = data => {
        return $http.post(`${url}/editPassword`, data).then(response => {
            localStorage.setItem('setting', JSON.stringify(response.data));
            mainFactory.loggedInUser.next(response.data);
            NotificationService.showSuccess();
            $('#changePasswordModal').modal('toggle');
        }, error => {
            NotificationService.showErrorText(error.data).then(ok => {
                $('#oldPassword').trigger('focus');
            });
            return 'error'
        });
    };

    // add new user
    model.addUser = data => {
        return $http.post(`${url}/addUser`, data).then(response => {
            model.users.push(response.data);
            NotificationService.showSuccess();
            $('#userModal').modal('toggle');
        }, error => {
            NotificationService.showError(error);
            $('#userModal').modal('toggle');
        });
    };

    // edit user
    model.editUser = data => {
        return $http.post(`${url}/editUser`, data).then(function (response) {
            angular.copy(response.data, model.users);
            NotificationService.showSuccess();
            $('#userModal').modal('toggle');
        }, function (error) {
            NotificationService.showError();
            $('#userModal').modal('toggle');
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
        return $http.post(`${url}/updatePermissions`, data).then(response => {
            angular.copy(response.data, model.users);
            NotificationService.showSuccess();
            $('#permissionsModal').modal('toggle');
        }, error => {
            NotificationService.showError(error);
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
});