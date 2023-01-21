app.factory('generalFactory', function($http, NotificationService) {
    // define URL
    const url = `http://localhost:3000`;

    var model = {};
   
    model.backupDB = async () => {
        let response = await window.electron.ipcRenderer.invoke('backupDB');
        if (response == 'success') {
            NotificationService.showSuccess()
        } else {
            console.log(response);
        }
    };

    return model;
});