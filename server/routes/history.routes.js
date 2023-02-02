module.exports = (app, db) => {

    // get sales invoices
    app.get('/getSalesInvoices/:date', (req, res) => {
        let date = req.params.date;
        let query = `SELECT I.invoice_ID, I.invoice_type, TIME(I.invoice_datetime) AS invoice_time, I.total_cost, I.total_price, C.customer_name AS customer_name, U.owner AS user, JSON_ARRAYAGG(JSON_OBJECT('record_ID', M.record_ID, 'item_ID_FK', M.item_ID_FK, 'item_description', S.item_description, 'qty', M.qty, 'currency', M.currency, 'exchange_rate', M.exchange_rate, 'unit_cost', M.unit_cost, 'unit_price', M.unit_price)) invoice_map FROM invoice AS I INNER JOIN invoice_map AS M ON I.invoice_ID = M.invoice_ID_FK INNER JOIN stock AS S ON S.item_ID = M.item_ID_FK INNER JOIN users AS U ON I.user_ID_FK = U.user_ID LEFT JOIN customers AS C ON I.customer_ID_FK = C.customer_ID WHERE DATE(invoice_datetime) = '${date}' AND invoice_status = 1 GROUP BY I.invoice_ID ORDER BY invoice_time DESC`;
        // UNION SELECT null, 'Payment', TIME(P.payment_datetime), P.payment_value, P.actual_payment_value, C.customer_name, P.payment_currency, null FROM customers_payments P INNER JOIN customers C ON customer_ID_FK = customer_ID ORDER BY invoice_time DESC 
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    // get payments 
    app.get('/getPaymentsHistory/:date', (req, res) => {
        let date = req.params.date;
        let query = `SELECT P.*, C.customer_name FROM customers_payments P INNER JOIN customers C ON P.customer_ID_FK = C.customer_ID WHERE Date(payment_datetime) = '${date}' ORDER BY Time(payment_datetime) DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        })
    })

    // delete invoice
    app.post('/deleteInvoice', (req, res) => {
        db.getConnection(function (error, connection) {
            if (error) {
                res.status(500).send(error);
            }
            connection.beginTransaction(function (error) {
                if (error) {
                    connection.destroy();
                    res.status(500).send(error);
                }
                let invoice = req.body.data;
                let query = `UPDATE invoice SET invoice_status = 0 WHERE invoice_ID = ?`;
                connection.query(query,  invoice.invoice_ID, function (error) {
                    if (error) {
                        connection.rollback(function () {
                            connection.destroy();
                            res.status(500).send(error);
                        });
                    } else {
                        let query2 = `UPDATE invoice_map SET record_status = 0 WHERE invoice_ID_FK = ?`;
                        connection.query(query2, invoice.invoice_ID, function(error) {
                            if (error) {
                                connection.rollback(function () {
                                    connection.destroy();
                                    res.status(400).send(error);
                                });
                            } else {
                                connection.commit(function (error) {
                                    if (error) {
                                        connection.rollback(function () {
                                            connection.destroy();
                                            res.status(400).send(error);
                                        });
                                    }
                                    connection.destroy();
                                    res.send('');
                                });
                            }
                        })
                    }
                })
            })
        });
    });

};