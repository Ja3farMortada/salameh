module.exports = (app, db) => {


    app.post('/getBarcode', (req, res) => {
        let barcode = req.body.data;
        let query = `SELECT * FROM stock WHERE barcode = ? AND item_status = 1`;
        db.query(query, barcode, function (error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send(result[0])
            }
        })
    })

    app.post('/checkout', (req, res) => {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send(error);
            }
            connection.beginTransaction(function (error) {
                if (error) {
                    connection.destroy();
                    res.status(500).send(error);
                }
                let invoice = req.body.invoice;
                let items = req.body.items;
                // // place new order
                let orderQuery = `INSERT INTO invoice SET ?`;
                connection.query(orderQuery, invoice, function (error, result) {
                    if (error) {
                        connection.rollback(function () {
                            connection.destroy();
                            res.status(400).send(error);
                        });
                    }
                    // invoice_details items
                    let invoice_ID = result.insertId;
                    let invoice_map = Array.from(items).map(function (item) {
                        return [invoice_ID, item.item_ID, item.qty, item.currency, item.exchange_rate, item.unit_cost, item.unit_price]
                    });
                    let mapQuery = `INSERT INTO invoice_map (invoice_ID_FK, item_ID_FK, qty, currency, exchange_rate, unit_cost, unit_price) VALUES ?`;
                    connection.query(mapQuery, [invoice_map], function (error) {
                        if (error) {
                            connection.rollback(function () {
                                connection.destroy();
                                res.status(400).send(error);
                            });
                        }
                        // comment commit if update stock was used
                        connection.commit(function (error) {
                            if (error) {
                                connection.rollback(function () {
                                    connection.destroy();
                                    res.status(400).send(error);
                                });
                            }
                            connection.release();
                            res.send('');
                        });
                    })
                })
            })
        })
    })

    // checkout with customer
    app.post('/customerCheckout', (req, res) => {
        db.getConnection(function (err, connection) {
            if (err) {
                res.status(500).send(error);
            }
            connection.beginTransaction(function (error) {
                if (error) {
                    connection.destroy();
                    res.status(500).send(error);
                }
                let invoice = req.body.invoice;
                let items = req.body.items;
                // // place new order
                let orderQuery = `INSERT INTO invoice SET ?`;
                connection.query(orderQuery, invoice, function (error, result) {
                    if (error) {
                        connection.rollback(function () {
                            connection.destroy();
                            res.status(400).send(error);
                        });
                    }
                    // invoice_details items
                    let invoice_ID = result.insertId;
                    let invoice_map = Array.from(items).map(function (item) {
                        return [invoice_ID, item.item_ID, invoice.customer_ID_FK, item.qty, item.currency, item.exchange_rate, item.unit_cost, item.unit_price]
                    });
                    let mapQuery = `INSERT INTO invoice_map (invoice_ID_FK, item_ID_FK, customer_ID_FK, qty, currency, exchange_rate, unit_cost, unit_price) VALUES ?`;
                    connection.query(mapQuery, [invoice_map], function (error) {
                        if (error) {
                            connection.rollback(function () {
                                connection.destroy();
                                res.status(400).send(error);
                            });
                        } else {
                            let totalDebts = items.reduce((memo, item) => {
                                return {
                                    totalLira: item.currency == 'lira' ? memo.totalLira + (item.qty * item.unit_price) : memo.totalLira,
                                    totalDollar: item.currency == 'dollar' ? memo.totalDollar + (item.qty * item.unit_price) : memo.totalDollar,
                                }
                            }, {
                                totalLira: 0,
                                totalDollar: 0
                            });
                            let customer_ID = invoice.customer_ID_FK;
                            let debtQuery = `UPDATE customers SET dollar_debt = (dollar_debt + ${totalDebts.totalDollar}), lira_debt = (lira_debt + ${totalDebts.totalLira}) WHERE customer_ID = ?`;
                            connection.query(debtQuery, customer_ID, function (error) {
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
                                        connection.release();
                                        res.send('');
                                    });
                                }
                            })
                        }
                    })
                })
            })
        })
    })
}