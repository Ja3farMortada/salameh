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
                return [invoice_ID, item.item_ID, invoice.customer_ID_FK, invoice.invoice_type, item.qty, item.currency, item.exchange_rate, item.sayrafa_rate, item.unit_cost, item.original_price, item.unit_price]
            });
            let mapQuery = `INSERT INTO invoice_map (invoice_ID_FK, item_ID_FK, customer_ID_FK, record_type, qty, currency, exchange_rate, sayrafa_rate, unit_cost, original_price, unit_price) VALUES ?`;
            await connection.query(mapQuery, [invoice_map]);

            let totalDebts = items.reduce((memo, item) => {
                return {
                    totalLira: item.currency == 'lira' ? memo.totalLira + (item.qty * item.original_price) : memo.totalLira,
                    totalDollar: item.currency == 'dollar' ? memo.totalDollar + (item.qty * item.original_price) : memo.totalDollar,
                    totalSayrafa: item.currency == 'sayrafa' ? memo.totalSayrafa + (item.qty * item.original_price) : memo.totalSayrafa
                }
            }, {
                totalLira: 0,
                totalDollar: 0,
                totalSayrafa: 0
            });
            let customer_ID = invoice.customer_ID_FK;
            let debtQuery = `UPDATE customers SET dollar_debt = (dollar_debt + ${totalDebts.totalDollar}), lira_debt = (lira_debt + ${totalDebts.totalLira}), sayrafa_debt = (sayrafa_debt + ${totalDebts.totalSayrafa}) WHERE customer_ID = ?`;
            await connection.query(debtQuery, customer_ID);

            await connection.commit();
            connection.release();
            res.send(`${result.insertId}`);
        } catch (error) {
            await connection.rollback();
            connection.release()
            res.status(500).send(error);
        }
    })



    app.post('/checkoutCustomer', async (req, res) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            let invoice = req.body.invoice;
            let items = req.body.items;

            let orderQuery = `INSERT INTO invoice SET ?`;
            let [result] = await connection.query(orderQuery, invoice);
            
            let invoice_ID = result.insertId;
            let invoice_map = Array.from(items).map(function (item) {
                return [invoice_ID, item.item_ID, invoice.customer_ID_FK, invoice.invoice_type, item.qty, item.currency, item.exchange_rate, item.sayrafa_rate, item.unit_cost, item.original_price, item.unit_price]
            });
            let mapQuery = `INSERT INTO invoice_map (invoice_ID_FK, customer_ID_FK, item_ID_FK, record_type, qty, currency, exchange_rate, sayrafa_rate, unit_cost, original_price, unit_price) VALUES ?`;
            await connection.query(mapQuery, [invoice_map]);

            await connection.commit();
            connection.release();
            res.send('');

        } catch (error) {
            await connection.rollback();
            connection.release()
            res.status(500).send(error);
        }
    })


}