module.exports = (app, db, md5) => {

    app.get('/getExchangeRate', async (req, res) => {
        let query = `SELECT rate_value, round_value FROM settings WHERE setting_name = 'exchangeRate' `;
        try {
            let [[results]] = await db.query(query);
            res.send(results)
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/updateExchangeRate', async (req, res) => {
        let query = `UPDATE settings SET ? WHERE setting_name = 'exchangeRate' `;
        try {
            await db.query(query, req.body)
            let [[results]] = await db.query(`SELECT rate_value, round_value FROM settings WHERE setting_name = 'exchangeRate'`)
            res.send(results);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.get('/getSayrafaRate', async (req, res) => {
        let query = `SELECT rate_value, round_value FROM settings WHERE setting_name = 'sayrafaRate' `;
        try {
            let [[results]] = await db.query(query);
            res.send(results)
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/updateSayrafaRate', async (req, res) => {
        let query = `UPDATE settings SET ? WHERE setting_name = 'sayrafaRate' `;
        try {
            await db.query(query, req.body)
            let [[results]] = await db.query(`SELECT rate_value, round_value FROM settings WHERE setting_name = 'sayrafaRate'`)
            res.send(results);
        } catch (error) {
            res.status(400).send(error);
        }
    });
}