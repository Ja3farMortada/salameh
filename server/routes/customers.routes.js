module.exports = (app, db) => {

    // get customers
    app.get('/getCustomers', async (req, res) => {
        let query = `SELECT * FROM customers WHERE customer_status = 1`;
        try {
            let [results] = await db.query(query);
            res.send(results);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // // add new customer
    app.post('/addCustomer', async (req, res) => {
        let data = req.body;
        let query = `INSERT INTO customers SET ?`;
        try {
            let [customer] = await db.query(query);
            let [[result]] = await db.query(`SELECT * FROM customers WHERE customer_ID = ${result.insertId}`);
            res.send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    })

    // // update customer data
    app.post('/updateCustomer', async (req, res) => {
        let data = req.body;
        let query = `UPDATE customers SET ? WHERE customer_ID = ?`;
        try {
            await db.query(query, [data, data.customer_ID]);
            let [[result]] = await db.query(`SELECT * FROM customers WHERE customer_ID = ${data.customer_ID}`)
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    // // delete customer
    app.post('/deleteCustomer', async (req, res) => {
        let data = req.body;
        let query = `UPDATE customers SET customer_status = 0 WHERE customer_ID = ?`;
        try {
            await db.query(query, data.customer_ID);
            res.send('deleted')
        } catch (error) {
            res.status(500).send(error);
        }
    })
}