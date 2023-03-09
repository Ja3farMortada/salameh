// app.directive('vouchersSettings', function (vouchersFactory) {
//     return {
//         restrict: 'E',
//         templateUrl: '_directives/templates/vouchersSettings.html',
//         scope: {

//         },
//         link: function (scope) {

//             scope.vouchers = vouchersFactory.vouchers;
//             scope.itemsPerPage = vouchersFactory.itemsPerPage;

//             // let offCanvasEl = document.getElementById('offcanvasBottom')
//             const offCanvas = new bootstrap.Offcanvas(document.getElementById('voucherOffcanvas'));
//             // scope.modalType;
//             scope.openOffCanvas = (type, data) => {
//                 if (type == 'edit') {
//                     scope.modalType = 'edit'
//                     scope.modalData = {};
//                     data.show_on_sell = data.show_on_sell == 1 ? true : false;
//                     angular.copy(data, scope.modalData);
//                     // scope.img = null;
//                     scope.img = `http://localhost:3000${scope.modalData.image_url}`
//                     offCanvas.show();
//                 } else {
//                     scope.modalType = 'add'
//                     scope.modalData = {
//                         item_name: null,
//                         item_description: null,
//                         item_type: 'Voucher',
//                         item_sub_category: null,
//                         item_cost: null,
//                         item_price: null,
//                         item_notes: null,
//                         show_on_sell: true
//                     }
//                     scope.img = null;
//                     offCanvas.show();
//                 }
//             }

//             // submit offCanvas
//             scope.submitVoucher = () => {
//                 switch (scope.modalType) {
//                     case 'add':
//                         if (scope.img) {
//                             vouchersFactory.addVoucherWithImage(scope.img, scope.modalData).then(response => {
//                                 if (response) {
//                                     scope.modalData = {
//                                         item_name: null,
//                                         item_description: null,
//                                         item_type: 'Voucher',
//                                         item_sub_category: null,
//                                         item_cost: null,
//                                         item_price: null,
//                                         item_notes: null,
//                                         show_on_sell: true
//                                     }
//                                     scope.img = null;
//                                 }
//                             })
//                         } else {
//                             vouchersFactory.addVoucher(scope.modalData).then(response => {
//                                 if (response) {
//                                     scope.modalData = {
//                                         item_name: null,
//                                         item_description: null,
//                                         item_type: 'Voucher',
//                                         item_sub_category: null,
//                                         item_cost: null,
//                                         item_price: null,
//                                         item_notes: null,
//                                         show_on_sell: true
//                                     }
//                                     scope.img = null;
//                                 }
//                             })
//                         }
//                         break;
//                     case 'edit':
//                         if (scope.img.name) {
//                             console.log(scope.modalData);
//                             vouchersFactory.updateVoucherImage(scope.img, scope.modalData).then(response => {
//                                 if (response) {
//                                     offCanvas.hide();
//                                 }
//                             })
//                         } else {
//                             vouchersFactory.updateVoucher(scope.modalData).then(response => {
//                                 if (response) {
//                                     offCanvas.hide()
//                                 }
//                             })
//                         }
//                         break;
//                 }
//             }

//             // Delete service
//             scope.deleteVoucher = data => {
//                 vouchersFactory.deleteVoucher(data)
//             }
//         }
//     }
// });