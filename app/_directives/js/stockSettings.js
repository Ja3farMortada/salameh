app.directive('stockSettings', function (stockFactory) {
    return {
        restrict: 'E',
        templateUrl: '_directives/templates/stockSettings.html',
        scope: {

        },
        link: function (scope) {

            // scope.categories = stockFactory.categories;

            // const categoryModal = new bootstrap.Modal('#categoryModal');
            // $('#categoryModal').on('shown.bs.modal', () => {
            //     $('#categoryName').trigger('focus')
            // })
            // scope.opencategoryModal = (type, data) => {
            //     if (type == 'Edit') {
            //         scope.modalType = 'Edit'
            //         scope.modalData = {};
            //         console.log(data);
            //         angular.copy(data, scope.modalData);
            //         categoryModal.show();
            //     } else {
            //         scope.modalType = 'Add'
            //         scope.modalData = {
            //             category_name: null,
            //         }
            //         categoryModal.show();
            //     }
            // }

            // // submit categoryModal
            // scope.submitCategory = () => {
            //     switch (scope.modalType) {
            //         case 'Add':
            //             stockFactory.addCategory(scope.modalData).then(response => {
            //                 if (response) {
            //                     scope.modalData = {
            //                         category_name: null,
            //                     }
            //                 }
            //             })
            //             categoryModal.hide()
            //             break;
            //         case 'Edit':
            //             stockFactory.updateCategory(scope.modalData).then(response => {
            //                 if (response) {
            //                     categoryModal.hide()
            //                 }
            //             })
            //             break;
            //     }
            // }

            // // Delete category
            // scope.deleteCategory = data => {
            //     stockFactory.deleteCategory(data)
            // }
        }
    }
});