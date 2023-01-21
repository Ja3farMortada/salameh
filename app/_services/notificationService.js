app.service('NotificationService', ['$timeout', function ($timeout) {

    this.getUrl = () => {
        return `http://localhost:3000`;
    }

    let successAudio = new Audio('assets/sounds/ding-sound.mp3');
    let errorAudio = new Audio('assets/sounds/error-2.wav');

    this.showSuccess = () => {
        successAudio.play();
        Swal.fire({
            title: ' ',
            text: 'Process Completed Successfully!',
            icon: 'success',
            position: 'bottom-end',
            toast: true,
            background: 'green',
            timer: 2000,
            showConfirmButton: false
        });
    };

    this.showError = error => {
        errorAudio.play();
        Swal.fire({
            title: 'ERROR!',
            text: `${error.data.sqlMessage}`,
            icon: 'error'
        });
    };

    this.showErrorText = text => {
        return Swal.fire({
            title: 'ERROR!',
            text: `${text}`,
            icon: 'error',
            returnFocus: true
        });
    };

    // this will focus on cancel
    this.showWarning = () => {
        return Swal.fire({
            title: "WARNING",
            text: "Are you sure you want to proceed?",
            icon: "warning",
            showCancelButton: true,
            focusConfirm: false,
            reverseButtons: true,
            returnFocus: false
        });
    };

    // this will focus on confirm
    this.showConfirm = () => {
        return Swal.fire({
            title: "WARNING",
            text: "Are you sure you want to proceed?",
            icon: "warning",
            showCancelButton: true,
            focusConfirm: true,
            reverseButtons: true,
            returnFocus: false
        });
    }

    this.playErrorSound = () => {
        errorAudio.play();
    }

}]);