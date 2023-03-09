app.directive('accountSettings', function (accountFactory, mainFactory, NotificationService) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/accountSettings.html',
        scope: {

        },
        link: function (scope) {

            let userSubscription;
            userSubscription = mainFactory.loggedInUser.subscribe(res => {
                scope.loggedInUser = res;
            })

            // bind users to model factory
            scope.users = accountFactory.users;

            // Open Edit Username Modal
            scope.openEditUsernameModal = function () {
                $('#editUsernameModal').modal('show');
                $('#editUsernameModal').on('shown.bs.modal', function () {
                    $(this).find('[autofocus]').focus();
                });
                scope.newUsername = null;
            };

            // Prevent spacing in change user modal and add user modal
            $(function () {
                $('#newUsername').on('keypress', function (e) {
                    if (e.keyCode == 32)
                        return false;
                });
                $('#createUsername').on('keypress', function (e) {
                    if (e.keyCode == 32)
                        return false;
                });
            });

            // Change Username function
            scope.changeUsername = function () {
                if (scope.newUsername && scope.newUsername.indexOf(' ') === -1) {
                    var exist = false;
                    for (var i = 0; i < scope.users.length; i++) {
                        if (scope.users[i]['username'] == scope.newUsername) {
                            exist = true;
                            scope.newUsername = null;
                            NotificationService.showErrorText(`Username already taken, please choose another one`).then(() => {
                                $('#newUsername').trigger('focus');
                            });
                            break;
                        }
                    }
                    if (exist == false) {
                        accountFactory.editUsername({
                            ID: scope.loggedInUser.user_ID,
                            newUsername: scope.newUsername
                        });
                    }
                }
            };

            // Open Change Password Modal
            scope.openChangePasswordModal = function () {
                $('#changePasswordModal').modal('show');
                $('#changePasswordModal').on('shown.bs.modal', function () {
                    $('#oldPassword').trigger('focus');
                });
                scope.oldPassword = null;
                scope.newPassword = null;
                scope.confirmPassword = null;
            };
            // Change Password function
            scope.changePassword = () => {
                if (scope.newPassword === scope.confirmPassword) {
                    accountFactory.changePassword({
                        ID: scope.loggedInUser.user_ID,
                        oldPassword: scope.oldPassword,
                        password: scope.confirmPassword
                    }).then(res => {
                        if (res == 'error') {
                            scope.oldPassword = null
                            scope.newPassword = null
                            scope.confirmPassword = null
                        }
                    })
                } else {
                    NotificationService.showErrorText(`Password didn't match, Please check your entries!`).then((ok) => {
                        scope.newPassword = null
                        scope.confirmPassword = null
                        scope.$digest()
                        $('#newPassword').trigger('focus');
                    });
                }
            };


            // ############################################## Users Section #########################################
            $('#userModal').on('shown.bs.modal', function () {
                $('#userUsername').trigger('focus');
            });
            scope.openUserModal = (type, data) => {
                if (type == 'add') {
                    scope.userModalType = 'Add'
                    scope.userModalData = {
                        username: null,
                        password: null,
                        confirmPassword: null,
                        owner: null
                    }
                    $('#userModal').modal('show');
                } else {
                    scope.userModalType = 'Edit'
                    scope.userModalData = {};
                    angular.copy(data, scope.userModalData);
                    $('#userModal').modal('show');
                }
            }

            scope.submitUser = () => {
                switch (scope.userModalType) {
                    case 'Add':
                        // add user
                        if (scope.userModalData.password == scope.userModalData.confirmPassword) {
                            accountFactory.addUser(scope.userModalData)
                        } else {
                            NotificationService.showErrorText(`Passwords didn't match!`).then(ok => {
                                scope.$digest(scope.userModalData.password = null);
                                scope.$digest(scope.userModalData.confirmPassword = null);
                                $('#userPassword').trigger('focus');
                            })
                        }
                        break;

                    case 'Edit':
                        // edit user
                        accountFactory.editUser(scope.userModalData)
                        break;
                }
            }

            // Delete function
            scope.deleteUser = function () {
                swal({
                    title: 'Alert!',
                    text: 'Are you sure you want to delete ' + scope.editUsername + ' ?',
                    buttons: true,
                    dangerMode: true
                }).then((ok) => {
                    if (ok) {
                        accountFactory.deleteUser({
                            ID: scope.selectedUserID
                        });
                    }
                });
            };

            // Open Permissions Modal
            scope.openPermissionsModal = user => {
                scope.selectedUser = {};
                user.viewStock = user.viewStock == 1 ? true : false;
                user.viewReports = user.viewReports == 1 ? true : false;
                user.deleteInvoice = user.deleteInvoice == 1 ? true : false;
                user.modifyCustomers = user.modifyCustomers == 1 ? true : false;
                angular.copy(user, scope.selectedUser);
                $('#permissionsModal').modal('show');
            };
            // update permissions function
            scope.updatePermissions = () => {
                accountFactory.updatePermissions(scope.selectedUser);
            };

            // Disable user function
            // scope.updateUserStatus = function (ID, username) {
            //     swal({
            //         buttons: true,
            //         title: 'Attention!',
            //         text: `Are You sure you want to update ${username} status?`,
            //         dangerMode: true
            //     }).then((ok) => {
            //         if (ok) {
            //             accountFactory.updateUserStatus({
            //                 UID: ID
            //             });
            //         }
            //     });
            // };

        }
    }
});