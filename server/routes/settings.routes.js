module.exports = (app, db, md5) => {

    app.get('/getExchangeRate', (req, res) => {
        let query = `SELECT setting_value FROM settings WHERE setting_name = 'exchangeRate' `;
        db.query(query, function (error, result) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(result[0]);
            }
        });
    });

    app.post('/updateExchangeRate', (req, res) => {
        let query = `UPDATE settings SET setting_value = ? WHERE setting_name = 'exchangeRate' `;
        db.query(query, req.body.rate, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send('');
            }
        });
    });
}