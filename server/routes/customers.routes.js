module.exports = (app, db) => {

    // get customers
    // app.get('/getCustomers', (req, res) => {
    //     let query = `SELECT * FROM customers WHERE customer_status = 1`;
    //     db.query(query, function(error, results) {
    //         if (error) {
    //             res.status(500).send(error);
    //         } else {
    //             res.send(results);
    //         }
    //     })
    // });

    // // add new customer
    // app.post('/addCustomer', (req, res) => {
    //     let data = req.body;
    //     let query = `INSERT INTO customers SET ?`;
    //     db.query(query, data, function(error, result) {
    //         if (error) {
    //             res.status(500).send(error);
    //         } else {
    //             db.query(`SELECT * FROM customers WHERE customer_ID = ${result.insertId}`, function(error, result) {
    //                 if (error) {
    //                     res.status(500).send(error);
    //                 } else {
    //                     res.send(result[0])
    //                 }
    //             })
    //         }
    //     })
    // })

    // // update customer data
    // app.post('/updateCustomer', (req, res) => {
    //     let data = req.body;
    //     let query = `UPDATE customers SET ? WHERE customer_ID = ?`;
    //     db.query(query, [data, data.customer_ID], function (error) {
    //         if (error) {
    //             res.status(400).send(error);
    //         } else {
    //             db.query(`SELECT * FROM customers WHERE customer_ID = ${data.customer_ID}`, function(error, result) {
    //                 if (error) {
    //                     res.status(500).send(error);
    //                 } else {
    //                     res.send(result[0])
    //                 }
    //             })
    //         }
    //     })
    // })

    // // delete customer
    // app.post('/deleteCustomer', (req, res) => {
    //     let data = req.body;
    //     let query = `UPDATE customers SET customer_status = 0 WHERE customer_ID = ?`;
    //     db.query(query, data.customer_ID, function (error) {
    //         if (error) {
    //             res.status(400).send(error);
    //         } else {
    //             res.send('deleted')
    //         }
    //     })
    // })
}