module.exports = (app, db) => {

    app.get('/getCustomerHistory/:id', (req, res) => {
        let id = req.params.id;
        let query = `SELECT 'debt' AS type, M.record_ID, DATE(M.record_datetime) AS date, TIME(M.record_datetime) AS time, M.qty, M.currency, M.exchange_rate, M.unit_cost, M.unit_price AS value, S.item_description AS item_description FROM invoice_map M INNER JOIN stock S ON item_ID = item_ID_FK WHERE customer_ID_FK = ?
        UNION 
        SELECT 'payment', P.payment_ID, DATE(P.payment_datetime), TIME(P.payment_datetime), null, P.payment_currency, P.exchange_rate, null, P.payment_value, null FROM customers_payments P WHERE customer_ID_FK = ? ORDER BY date DESC, time DESC`;
        db.query(query, [id, id], function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results)
            }
        })
    })

    // add payment
    app.post('/addPayment', (req, res) => {
        db.getConnection((err, connection) => {
            if (err) {
                res.status(500).send(error);
            }
            connection.beginTransaction(function (error) {
                if (error) {
                    connection.destroy();
                    res.status(500).send(error);
                }
                let data = req.body;
                let query = `INSERT INTO customers_payments SET ?`;
                connection.query(query, data, function (error, result) {
                    if (error) {
                        connection.rollback(function () {
                            connection.destroy();
                            res.status(400).send(error);
                        });
                    }
                    let payment_value = data.payment_value;
                    let customer_ID = data.customer_ID_FK;
                    let payment_currency = data.payment_currency;
                    let query2;
                    switch (payment_currency) {
                        case 'lira':
                            query2 = `UPDATE customers SET lira_debt = ( lira_debt - ${payment_value}) WHERE customer_ID = ?`;
                            break;
                        case 'dollar':
                            query2 = `UPDATE customers SET dollar_debt = ( dollar_debt - ${payment_value} ) WHERE customer_ID = ?`;
                    }
                    connection.query(query2, customer_ID, function (error) {
                        if (error) {
                            connection.rollback(function () {
                                connection.destroy();
                                res.status(400).send(error);
                            });
                        } else {
                            connection.query(`SELECT * FROM customers WHERE customer_ID = ${customer_ID}`, function (error, result) {
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
                                        res.send(result[0]);
                                    });
                                }
                            })
                        }
                    })
                })
            })
        });
    })
}