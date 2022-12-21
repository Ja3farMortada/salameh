app.factory('generalFactory', ['$http', 'NotificationService', function($http, NotificationService) {
    // define URL
    const url = `http://localhost:3000`;

    var model = {};
   
    model.backupDB = () => {
        // ipcRenderer.send('backupDB');
        
        // ipcRenderer.on('backup-success', () => {
        //     NotificationService.showSuccessToast()
        // })

        // ipcRenderer.on('backup-error', () => {
        //     NotificationService.showErrorToast()
        // })
    };

    return model;
}]);