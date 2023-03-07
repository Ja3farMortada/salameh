module.exports = (app, db) => {


    app.post('/getBarcode', async (req, res) => {
        let barcode = req.body.data;
        try {
            let [
                [result]
            ] = await db.query(`SELECT * FROM stock WHERE barcode = ? AND item_status = 1`, barcode);
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    // checkout
    app.post('/checkout', async (req, res) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            let invoice = req.body.invoice;
            let items = req.body.items;
            const [result] = await connection.query(`INSERT INTO invoice SET ?`, [invoice]);
            let invoice_ID = result.insertId;
            let invoice_map = Array.from(items).map(function (item) {
                return [invoice_ID, item.item_ID, invoice.invoice_type, item.qty, item.currency, item.exchange_rate, item.sayrafa_rate, item.unit_cost, item.original_price, item.unit_price]
            });

            await connection.query(`INSERT INTO invoice_map (invoice_ID_FK, item_ID_FK, record_type, qty, currency, exchange_rate, sayrafa_rate, unit_cost, original_price, unit_price) VALUES ?`, [invoice_map]);

            await connection.commit();
            connection.release();
            res.send('');

        } catch (error) {
            await connection.rollback();
            connection.release()
            res.status(500).send(error);
        }
    })

    // checkout with customer
    app.post('/checkoutDebt', async (req, res) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            let invoice = req.body.invoice;
            let items = req.body.items;
            let orderQuery = `INSERT INTO invoice SET ?`;
            let [result] = await connection.query(orderQuery, invoice);
            
            let invoice_ID = result.insertId;
            let invoice_map = Array.from(items).map(function (item) {
                return [invoice_ID, item.item_ID, invoice.customer_ID_FK, invoice.invoice_type, item.qty, item.currency, item.exchange_rate, item.unit_cost, item.unit_price]
            });
            let mapQuery = `INSERT INTO invoice_map (invoice_ID_FK, item_ID_FK, customer_ID_FK, record_type, qty, currency, exchange_rate, unit_cost, unit_price) VALUES ?`;
            await connection.query(mapQuery, [invoice_map]);

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
            await connection.query(debtQuery, customer_ID);

            await connection.commit();
            connection.release();
            res.send('');
        } catch (error) {
            await connection.rollback();
            connection.release()
            res.status(500).send(error);
        }
    })



    app.post('/checkoutCustomer', (req, res) => {
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
                        return [invoice_ID, invoice.customer_ID_FK, item.item_ID, invoice.invoice_type, item.qty, item.currency, item.exchange_rate, item.unit_cost, item.unit_price]
                    });
                    let mapQuery = `INSERT INTO invoice_map (invoice_ID_FK, customer_ID_FK, item_ID_FK, record_type, qty, currency, exchange_rate, unit_cost, unit_price) VALUES ?`;
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



}


// let [[addedInvoice]] = await connection.query(`SELECT I.invoice_ID, I.invoice_type, I.invoice_datetime AS invoice_datetime, TIME(I.invoice_datetime) AS invoice_time, I.total_price, I.address, U.owner AS user,
// JSON_ARRAYAGG(JSON_OBJECT('record_ID', M.record_ID, 'item_ID_FK', M.item_ID_FK, 'item_description', S.item_description, 'qty', M.qty, 'currency', M.currency, 'exchange_rate', M.exchange_rate, 'sayrafa_rate', M.sayrafa_rate, 'original_price', M.original_price, 'unit_price', M.unit_price)) invoice_map
// FROM invoice AS I
// INNER JOIN invoice_map AS M ON I.invoice_ID = M.invoice_ID_FK
// INNER JOIN stock AS S ON S.item_ID = M.item_ID_FK
// INNER JOIN users AS U ON I.user_ID_FK = U.user_ID
// WHERE invoice_ID = ${invoice_ID}
// AND invoice_status = 1`);